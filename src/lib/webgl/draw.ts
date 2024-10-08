import type { DrawSpell, GameState, SlotRenderData, TextureMetadataMap, TextureMetadata, DrawElement } from '$lib/types';
import { initBuffers } from './buffers';
import { mat4 } from 'gl-matrix';
import { drawBackground } from './drawBackground';

let positionBuffer: WebGLBuffer;
let textureCoordBuffer: WebGLBuffer;
let positionAttribute: number;
let textureCoordAttribute: number;
let samplerUniform: WebGLUniformLocation;
let projectionMatrixUniform: WebGLUniformLocation;
let whiteFlashUniform: WebGLUniformLocation;

export function initDrawScene(gl: WebGLRenderingContext, shaderProgram: WebGLProgram) {
	({ positionBuffer, textureCoordBuffer } = initBuffers(gl));
	positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler')!;
	projectionMatrixUniform = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')!;
	whiteFlashUniform = gl.getUniformLocation(shaderProgram, 'uWhiteFlash')!;
	gl.enableVertexAttribArray(positionAttribute);
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.uniform1i(samplerUniform, 0);
}

export function drawScene(game: GameState, slotRenderData: SlotRenderData[], gl: WebGLRenderingContext, shaderProgram: WebGLProgram, textures: TextureMetadataMap, drawSpells: DrawSpell[]) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Create and set the projection matrix
	const projectionMatrix = mat4.create();
	mat4.ortho(projectionMatrix, 0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

	gl.uniformMatrix4fv(projectionMatrixUniform, false, projectionMatrix);

	// Draw background
	const backgroundMetadata = textures['/bg/current.png'];
	if (backgroundMetadata) {
		drawBackground(
			gl,
			shaderProgram,
			positionBuffer,
			textureCoordBuffer,
			backgroundMetadata,
			whiteFlashUniform // Pass the uniform location here
		);
	}

	// Collect all elements to draw
	const allElements: DrawElement[] = [...slotRenderData, ...drawSpells.filter(spell => spell.draw)].sort((a, b) => a.zIndex - b.zIndex);

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
				whiteFlashUniform,
				element.currentFrame // Pass the current frame for grid calculation
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
	whiteFlashUniform: WebGLUniformLocation,
	currentFrame: number
) {
	const { width: imageWidth, height: imageHeight, isGridFormat, gridRows = 1, gridCols = 1 } = textureMetadata;

	// Define positions for vertices before rotation
	let positions = new Float32Array([
		0,
		0, // Top-left
		0,
		imageHeight, // Bottom-left
		imageWidth,
		0, // Top-right
		imageWidth,
		imageHeight, // Bottom-right
	]);

	// Compute rotation around the center of the image
	const centerX = imageWidth / 2;
	const centerY = imageHeight / 2;
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);

	// Apply scaling, rotation, and translation to each vertex
	for (let i = 0; i < positions.length; i += 2) {
		let x0 = positions[i] - centerX;
		let y0 = positions[i + 1] - centerY;

		// Apply scaling
		x0 *= scale;
		y0 *= scale;

		// Apply rotation
		const xRotated = x0 * cos - y0 * sin;
		const yRotated = x0 * sin + y0 * cos;

		// Translate back and apply position
		positions[i] = xRotated + x;
		positions[i + 1] = yRotated + y;
	}

	// Set vertex positions
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(positionAttribute);

	// Bind texture and set texture coordinates
	gl.bindTexture(gl.TEXTURE_2D, textureMetadata.texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

	let textureCoords;
	if (isGridFormat) {
		// Calculate frame position within the grid
		const frameX = currentFrame % gridCols;
		const frameY = Math.floor(currentFrame / gridCols);
		const cellWidth = 1 / gridCols;
		const cellHeight = 1 / gridRows;

		// Texture coordinates based on grid cell
		textureCoords = new Float32Array([
			frameX * cellWidth,
			frameY * cellHeight, // Top-left
			frameX * cellWidth,
			(frameY + 1) * cellHeight, // Bottom-left
			(frameX + 1) * cellWidth,
			frameY * cellHeight, // Top-right
			(frameX + 1) * cellWidth,
			(frameY + 1) * cellHeight, // Bottom-right
		]);
	} else {
		// Default texture coordinates for non-grid textures
		textureCoords = new Float32Array([
			0.0,
			0.0, // Top-left
			0.0,
			1.0, // Bottom-left
			1.0,
			0.0, // Top-right
			1.0,
			1.0, // Bottom-right
		]);
	}

	gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(textureCoordAttribute);

	// Apply white flash uniform
	gl.uniform1f(whiteFlashUniform, whiteFlash);

	// Draw the element
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
