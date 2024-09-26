import type { DrawSpell, GameState, SlotRenderData } from '$lib/types';
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
	textures: { [key: string]: WebGLTexture },
	drawSpells: DrawSpell[]
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Draw background
	const backgroundTexture = textures['/bg/current.png'];
	if (backgroundTexture) {
		drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundTexture);
	}

	// Sort slots by zIndex before rendering
	const sortedSlots = slotRenderData.slice().sort((a, b) => a.zIndex - b.zIndex);

	// Draw creatures in sorted order
	sortedSlots.forEach(slot => {
		const texture = textures[slot.texturePath];
		if (texture) {
			drawElement(
				gl,
				shaderProgram,
				positionBuffer,
				textureCoordBuffer,
				texture,
				slot.x,
				slot.y,
				slot.scale,
				positionAttribute,
				textureCoordAttribute
			);
		} else {
			console.warn(`Texture not found for path: ${slot.texturePath}`);
		}
	});

	// Draw spells (they will also respect z-order if needed)
	for (let spell of drawSpells.sort((a, b) => a.z - b.z)) {
		if (spell.draw) {
			const frameTexture = textures[spell.texturePath];
			if (frameTexture) {
				drawElement(
					gl,
					shaderProgram,
					positionBuffer,
					textureCoordBuffer,
					frameTexture,
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
	texture: WebGLTexture,
	x: number,
	y: number,
	scale: number,
	positionAttribute: number,
	textureCoordAttribute: number
) {
	const { scaleX, scaleY } = calculateScaling(gl, scale, 1);
	setPositionBuffer(gl, positionBuffer, x, y, scaleX, scaleY, positionAttribute);
	bindTextureAndCoords(gl, texture, textureCoordBuffer, textureCoordAttribute);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function calculateScaling(gl: WebGLRenderingContext, scale: number, imgAspectRatio: number) {
	const canvasAspectRatio = gl.canvas.width / gl.canvas.height;
	const cardAspectRatio = 614 / 868;

	let scaleX = scale;
	let scaleY = scaleX / cardAspectRatio;

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
	positionAttribute: number
) {
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	const positions = new Float32Array([
		-scaleX + x,
		scaleY + y,
		-scaleX + x,
		-scaleY + y,
		scaleX + x,
		scaleY + y,
		scaleX + x,
		-scaleY + y,
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
