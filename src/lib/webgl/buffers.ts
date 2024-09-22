export function initBuffers(gl: WebGLRenderingContext): {
	positionBuffer: WebGLBuffer;
	textureCoordBuffer: WebGLBuffer;
} {
	//prettier-ignore
	const positions = [
		-0.5,  0.5,   // Top-left
		-0.5, -0.5,   // Bottom-left
		 0.5,  0.5,   // Top-right
		 0.5, -0.5,   // Bottom-right
	];
	const positionBuffer = gl.createBuffer()!;
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	//prettier-ignore
	//prettier-ignore
	const textureCoordinates = [
		0.0,  0.0,   // Top-left
		0.0,  1.0,   // Bottom-left
		1.0,  0.0,   // Top-right
		1.0,  1.0,   // Bottom-right
	];
	const textureCoordBuffer = gl.createBuffer()!;
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array(textureCoordinates),
		gl.STATIC_DRAW
	);

	return { positionBuffer, textureCoordBuffer };
}
