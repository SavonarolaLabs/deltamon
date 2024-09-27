import type {
	DrawSpell,
	GameState,
	SlotRenderData,
	TextureMetadataMap,
	TextureMetadata,
} from '$lib/types';
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

	const backgroundMetadata = textures['/bg/current.png'];
	if (backgroundMetadata) {
		drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundMetadata);
	}

	const sortedSlots = slotRenderData.slice().sort((a, b) => a.zIndex - b.zIndex);

	sortedSlots.forEach(slot => {
		const textureMetadata = textures[slot.texturePath];
		if (textureMetadata) {
			drawElement(
				gl,
				shaderProgram,
				positionBuffer,
				textureCoordBuffer,
				textureMetadata,
				slot.x,
				slot.y,
				slot.scale,
				positionAttribute,
				textureCoordAttribute,
				slot.whiteFlash
			);
		} else {
			console.warn(`Texture not found for path: ${slot.texturePath}`);
		}
	});

	for (let spell of drawSpells.sort((a, b) => a.z - b.z)) {
		if (spell.draw) {
			const frameMetadata = textures[spell.texturePath];
			if (frameMetadata) {
				drawElement(
					gl,
					shaderProgram,
					positionBuffer,
					textureCoordBuffer,
					frameMetadata,
					spell.x,
					spell.y,
					spell.scale,
					positionAttribute,
					textureCoordAttribute
				);
			} else {
				console.warn(`${spell.texturePath} not in textures[].`);
			}
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
	angle: number = 0
) {
	const { scaleX, scaleY } = calculateScaling(gl, scale, textureMetadata.aspectRatio);

	setPositionBuffer(gl, positionBuffer, x, y, scaleX, scaleY, positionAttribute, angle);
	bindTextureAndCoords(gl, textureMetadata.texture, textureCoordBuffer, textureCoordAttribute);

	const whiteFlashUniform = gl.getUniformLocation(shaderProgram, 'uWhiteFlash');
	gl.uniform1f(whiteFlashUniform, whiteFlash);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function calculateScaling(gl: WebGLRenderingContext, scale: number, imgAspectRatio: number) {
	const canvasAspectRatio = gl.canvas.width / gl.canvas.height;

	let scaleX = scale;
	let scaleY = scaleX / imgAspectRatio;

	if (canvasAspectRatio > 1) {
		scaleX /= canvasAspectRatio;
	} else {
		scaleY *= canvasAspectRatio;
	}

	return { scaleX, scaleY };
}

function setPositionBuffer(
	gl: WebGLRenderingContext,
	positionBuffer: WebGLBuffer,
	x: number,
	y: number,
	scaleX: number,
	scaleY: number,
	positionAttribute: number,
	angle: number = 0
) {
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	const cos = Math.cos(angle);
	const sin = Math.sin(angle);

	// Calculate the rotated vertices without dividing scale
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

	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
}

function bindTextureAndCoords(
	gl: WebGLRenderingContext,
	texture: WebGLTexture,
	textureCoordBuffer: WebGLBuffer,
	textureCoordAttribute: number
) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
}
