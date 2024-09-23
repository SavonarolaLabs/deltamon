import { game } from '$lib/pvp/game';
import { initBuffers } from './buffers';
import { drawBackground } from './drawBackground';

export function drawScene(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	creatureTextures: { [key: string]: WebGLTexture },
	backgroundTexture: WebGLTexture
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Get buffers ready
	const { positionBuffer, textureCoordBuffer } = initBuffers(gl);

	// Draw background first
	drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundTexture);

	// Now draw the creatures after the background
	game.slots.forEach((slot, index) => {
		if (slot.creature) {
			const texture = creatureTextures[slot.creature.img];
			if (texture) {
				const x = calculateXPosition(index);
				const y = calculateYPosition(index);
				drawSlot(gl, shaderProgram, positionBuffer, textureCoordBuffer, texture, x, y);
			} else {
				console.error(`Texture not found for creature: ${slot.creature.img}`);
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
	// Bind the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Set the size of each creature (you can adjust this value as needed)
	const s = 0.25;

	// Modify the positions to correctly place the creatures
	const modifiedPositions = new Float32Array([
		-s + x,
		s + y, // Top-left
		-s + x,
		-s + y, // Bottom-left
		s + x,
		s + y, // Top-right
		s + x,
		-s + y, // Bottom-right
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	// Bind position attribute and texture coordinates
	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	// Bind the creature texture
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Bind the texture coordinate buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	// Bind the texture sampler
	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	// Draw the creature quad
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function calculateXPosition(index: number): number {
	return index % 2 === 0 ? -0.75 : 0.75; // Example logic for left and right positioning
}

function calculateYPosition(index: number): number {
	return 0.7 - Math.floor(index / 2) * 0.6; // Example logic for vertical positioning
}
