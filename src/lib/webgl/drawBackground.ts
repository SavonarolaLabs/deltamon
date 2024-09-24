export function drawBackground(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	backgroundTexture: WebGLTexture | null
) {
	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;

	// Aspect ratio of the background image (1280 / 720)

	//const imageAspectRatio = 1600 / 1093;
	const imageAspectRatio = 1792 / 1024;
	const canvasAspectRatio = canvasWidth / canvasHeight;

	let width, height;

	// Maintain aspect ratio and adjust based on canvas size
	if (canvasAspectRatio > imageAspectRatio) {
		// Canvas is wider, fit by height and adjust width
		height = 2.0;
		width = (height * imageAspectRatio) / canvasAspectRatio;
	} else {
		// Canvas is taller, fit by width and adjust height
		width = 2.0;
		height = (width * canvasAspectRatio) / imageAspectRatio;
	}

	// Set the vertex positions for the background quad (centered, maintaining aspect ratio)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// prettier-ignore
	const modifiedPositions = new Float32Array([
		-width / 2,  height / 2,   // Top-left
		-width / 2, -height / 2,   // Bottom-left
		 width / 2,  height / 2,   // Top-right
		 width / 2, -height / 2    // Bottom-right
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	// Bind position attribute and texture coordinates
	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	// Bind the background texture
	if (backgroundTexture) {
		gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	// Draw the background quad

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
