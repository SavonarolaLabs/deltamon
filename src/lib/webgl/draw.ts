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
			const texture = creatureTextures[slot.creature.img]; // Access the texture using .img
			if (texture) {
				const x = calculateXPosition(index);
				const y = calculateYPosition(index);
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

	const s = 0.5;
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

function calculateXPosition(index: number): number {
	// Left side (slots 0, 2, 4) and right side (slots 6, 8, 10)
	return index < 6 ? -0.75 : 0.75;
}

function calculateYPosition(index: number): number {
	// Rows are based on the modulo of index within each side
	const rowIndex = Math.floor((index % 6) / 2);
	const baseY = 0.7;
	const rowHeight = 0.6;

	// Adjust the Y position based on the row
	return baseY - rowIndex * rowHeight;
}
