import { game } from '$lib/pvp/game';
import { initBuffers } from './buffers';
import { drawBackground } from './drawBackground';

// prettier-ignore
const slotPositions = [
	[-0.75, 0.7], [-0.25, 0.7], [0.25, 0.7], [0.75, 0.7],  // Row 1
	[-0.75, 0.2], [-0.25, 0.2], [0.25, 0.2], [0.75, 0.2],  // Row 2
	[-0.75, -0.3], [-0.25, -0.3], [0.25, -0.3], [0.75, -0.3] // Row 3
];

function slotIndex(index: number): number {
	// prettier-ignore
	const indexMap = [
		0, 1, 4, 5, 8, 9,
		2, 3, 6, 7, 10, 11
	];

	return indexMap[index];
}

function getSlotPosition(index: number): [number, number] {
	// @ts-ignore
	return slotPositions[slotIndex(index)];
}

export function drawScene(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	creatureTextures: { [key: string]: WebGLTexture },
	backgroundTexture: WebGLTexture
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	const { positionBuffer, textureCoordBuffer } = initBuffers(gl);
	drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundTexture);
	game.slots.forEach((slot, index) => {
		if (slot.creature) {
			const texture = creatureTextures[slot.creature.img];
			if (texture) {
				const [x, y] = getSlotPosition(index);
				drawSlot(gl, shaderProgram, positionBuffer, textureCoordBuffer, texture, x, y);
			} else {
				console.error(`Texture not found for creature img: ${slot.creature.img}`);
			}
		}
	});
}

function drawSlot(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	texture: WebGLTexture,
	x: number,
	y: number
) {
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	const s = 0.22;
	//prettier-ignore
	const modifiedPositions = new Float32Array([
		-s + x,  s + y,   // Top-left
		-s + x, -s + y,   // Bottom-left
		 s + x,  s + y,   // Top-right
		 s + x, -s + y,   // Bottom-right
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	// Bind texture and texture coordinates
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	// Draw the textured quad
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
