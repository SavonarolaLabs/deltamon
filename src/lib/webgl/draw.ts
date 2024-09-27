import type { DrawSpell, GameState, SlotRenderData, TextureMetadataMap, TextureMetadata } from '$lib/types';
import { initBuffers } from './buffers';
import { drawBackground } from './drawBackground';

let positionBuffer: WebGLBuffer;
let textureCoordBuffer: WebGLBuffer;
let positionAttribute: number;
let textureCoordAttribute: number;
let samplerUniform: WebGLUniformLocation;

export function initDrawScene(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
	({ positionBuffer, textureCoordBuffer } = initBuffers(gl));
	positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler')!;
	gl.enableVertexAttribArray(positionAttribute);
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.uniform1i(samplerUniform, 0);
}

export function drawScene(
	game: GameState,
	slotRenderData: SlotRenderData[],
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	textures: TextureMetadataMap,
	drawSpells: DrawSpell[]
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	const whiteFlashUniform = gl.getUniformLocation(shaderProgram, 'uWhiteFlash')!;
	const backgroundMetadata = textures['/bg/current.png'];
	if (backgroundMetadata) {
		drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundMetadata);
	}

	const allElements = [
		...slotRenderData.map(slot => ({ ...slot, type: 'slot' })),
		...drawSpells.filter(spell => spell.draw).map(spell => ({ ...spell, type: 'spell' })),
	].sort((a, b) => (a.zIndex ?? a.z) - (b.zIndex ?? b.z));

	let i = 0;
	for (const element of allElements) {
		i++;
		const textureMetadata = textures[element.texturePath];
		if (textureMetadata) {
			const { x, y, scale, whiteFlash = 0, angle = 0 } = element;
			drawElement(
				gl,
				shaderProgram,
				positionBuffer,
				textureCoordBuffer,
				textureMetadata,
				x,
				y,
				scale,
				positionAttribute,
				textureCoordAttribute,
				whiteFlash,
				i > 5 ? -Math.PI / 2 : 0,
				whiteFlashUniform
			);
		} else {
			console.warn(`Texture not found for path: ${element.texturePath}`);
		}
	}
}

function drawElement(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	textureMetadata: TextureMetadata,
	x: number,
	y: number,
	scale: number,
	positionAttribute: number,
	textureCoordAttribute: number,
	whiteFlash: number = 0,
	angle: number = 0,
	whiteFlashUniform: WebGLUniformLocation
) {
	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;
	const imageWidth = textureMetadata.width;
	const imageHeight = textureMetadata.height;

	// Use canvas and image aspect ratios
	const canvasAspectRatio = canvasWidth / canvasHeight;
	const imageAspectRatio = imageWidth / imageHeight;

	let scaleX, scaleY;

	// Match scaling for aspect ratio
	if (canvasAspectRatio > imageAspectRatio) {
		scaleX = scale / canvasAspectRatio;
		scaleY = scale / imageAspectRatio;
	} else {
		scaleX = scale;
		scaleY = scale * imageAspectRatio;
	}

	// Compute rotation
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);

	// Define positions for vertices after scaling and rotation
	const positions = new Float32Array([
		-scaleX * cos - scaleY * sin + x,
		-scaleX * sin + scaleY * cos + y, // Top-left
		-scaleX * cos + scaleY * sin + x,
		-scaleX * sin - scaleY * cos + y, // Bottom-left
		scaleX * cos - scaleY * sin + x,
		scaleX * sin + scaleY * cos + y, // Top-right
		scaleX * cos + scaleY * sin + x,
		scaleX * sin - scaleY * cos + y, // Bottom-right
	]);

	// Use the pre-initialized position buffer and set vertex positions
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttribute);

	// Bind texture and use the pre-initialized texture coordinate buffer
	gl.bindTexture(gl.TEXTURE_2D, textureMetadata.texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoords = new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
	gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(textureCoordAttribute);

	// Apply white flash uniform
	gl.uniform1f(whiteFlashUniform, whiteFlash);

	// Draw the element
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
