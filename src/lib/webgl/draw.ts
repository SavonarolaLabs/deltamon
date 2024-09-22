import { game } from "$lib/pvp/game";
import { initBuffers } from "./buffers";
import { drawBackground } from "./drawBackground";
import { loadBackgroundTexture, loadCreatureTexture } from "./textures";

let backgroundTexture: WebGLTexture | null = null; // Cache the background texture

export function drawScene(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	creatureTextures: { [key: string]: WebGLTexture }
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Get buffers ready
	const { positionBuffer, textureCoordBuffer } = initBuffers(gl);

	// Iterate over the grid and draw creatures or empty slots
	game.slots.forEach((slot, index) => {
		const isCreature = !!slot.creature;
		const texture = isCreature
			? creatureTextures[slot.creature!.bcId]
			: null;

		// Calculate position for each slot
		const x = calculateXPosition(index);
		const y = calculateYPosition(index);

		// Draw creatures or empty slots first
		drawSlot(
			gl,
			shaderProgram,
			positionBuffer,
			textureCoordBuffer,
			texture,
			x,
			y
		);
	});

	// After drawing creatures, draw the background
	if (backgroundTexture) {
		// If the background texture is already loaded, use it directly
		drawBackground(
			gl,
			shaderProgram,
			positionBuffer,
			textureCoordBuffer,
			backgroundTexture
		);
	} else {
		// Load the background texture if it hasn't been loaded yet
		loadBackgroundTexture(gl, "castle.png", (texture) => {
			backgroundTexture = texture; // Cache the texture
			drawBackground(
				gl,
				shaderProgram,
				positionBuffer,
				textureCoordBuffer,
				backgroundTexture
			);
		});
	}
}

function drawSlot(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	texture: WebGLTexture | null,
	x: number,
	y: number
) {
	console.log("draw slot");
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	const s = 0.5;
	// prettier-ignore
	const modifiedPositions = new Float32Array([
		-s + x,  s + y,   // Top-left
		-s + x, -s + y,   // Bottom-left
		 s + x,  s + y,   // Top-right
		 s + x, -s + y,   // Bottom-right
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	const positionAttribute = gl.getAttribLocation(
		shaderProgram,
		"aVertexPosition"
	);
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	// Bind texture and texture coordinates
	if (texture) {
		gl.bindTexture(gl.TEXTURE_2D, texture);

		gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
		const textureCoordAttribute = gl.getAttribLocation(
			shaderProgram,
			"aTextureCoord"
		);
		gl.enableVertexAttribArray(textureCoordAttribute);
		gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

		const samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
		gl.uniform1i(samplerUniform, 0);

		// Draw the textured quad
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
}

function calculateXPosition(index: number): number {
	return index % 2 === 0 ? -0.75 : 0.75; // Example logic for left and right positioning
}

function calculateYPosition(index: number): number {
	return 0.7 - Math.floor(index / 2) * 0.6; // Example logic for vertical positioning
}
