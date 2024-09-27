import type { TextureMetadata } from '$lib/types';

export function drawBackground(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	backgroundMetadata: TextureMetadata
) {
	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;
	const imageWidth = backgroundMetadata.width;
	const imageHeight = backgroundMetadata.height;

	const widthRatio = imageWidth / canvasWidth;
	const heightRatio = imageHeight / canvasHeight;

	let width, height;

	if (widthRatio < heightRatio) {
		width = 2.0;
		height = (heightRatio / widthRatio) * 2.0;
	} else {
		height = 2.0;
		width = (widthRatio / heightRatio) * 2.0;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	//prettier-ignore
	const modifiedPositions = new Float32Array([
		-width / 2, height / 2,
		-width / 2, -height / 2,
		width / 2, height / 2,
		width / 2, -height / 2,
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	gl.bindTexture(gl.TEXTURE_2D, backgroundMetadata.texture);

	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
