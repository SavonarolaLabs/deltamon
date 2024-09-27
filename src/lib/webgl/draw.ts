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

	const whiteFlashUniform = gl.getUniformLocation(shaderProgram, 'uWhiteFlash')!;
	const backgroundMetadata = textures['/bg/current.png'];
	if (backgroundMetadata) {
		drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundMetadata);
	}

	const allElements = [
		...slotRenderData.map(slot => ({ ...slot, type: 'slot' })),
		...drawSpells.filter(spell => spell.draw).map(spell => ({ ...spell, type: 'spell' })),
	].sort((a, b) => (a.zIndex || a.z) ?? 0 - (b.zIndex || b.z) ?? 0);

	for (const element of allElements) {
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
				angle,
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
	const { scaleX, scaleY } = calculateScaling(gl, scale, textureMetadata.aspectRatio);

	setPositionBuffer(gl, positionBuffer, x, y, scaleX, scaleY, positionAttribute, angle);
	bindTextureAndCoords(gl, textureMetadata.texture, textureCoordBuffer, textureCoordAttribute);

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
