import type { TextureMetadata } from '$lib/types';

export function drawBackground(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	backgroundMetadata: TextureMetadata
) {
	// Define positions to cover the entire canvas
	const positions = new Float32Array([
		0,
		0, // Top-left
		0,
		gl.canvas.height, // Bottom-left
		gl.canvas.width,
		0, // Top-right
		gl.canvas.width,
		gl.canvas.height, // Bottom-right
	]);

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	gl.bindTexture(gl.TEXTURE_2D, backgroundMetadata.texture);

	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoords = new Float32Array([
		0.0,
		0.0, // Top-left
		0.0,
		1.0, // Bottom-left
		1.0,
		0.0, // Top-right
		1.0,
		1.0, // Bottom-right
	]);
	gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);

	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
