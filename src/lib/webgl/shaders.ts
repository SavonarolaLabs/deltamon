export function initShaders(gl: WebGLRenderingContext): WebGLProgram {
	const vertexShaderSource = `
		attribute vec4 aVertexPosition;
		attribute vec2 aTextureCoord;
		varying highp vec2 vTextureCoord;
		void main(void) {
			gl_Position = aVertexPosition;
			vTextureCoord = aTextureCoord;
		}
	`;

	const fragmentShaderSource = `
		varying highp vec2 vTextureCoord;
		uniform sampler2D uSampler;
		void main(void) {
			gl_FragColor = texture2D(uSampler, vTextureCoord);
		}
	`;

	const vertexShader = compileShader(
		gl,
		gl.VERTEX_SHADER,
		vertexShaderSource
	);
	const fragmentShader = compileShader(
		gl,
		gl.FRAGMENT_SHADER,
		fragmentShaderSource
	);

	const shaderProgram = gl.createProgram()!;
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error(
			"Unable to initialize the shader program:",
			gl.getProgramInfoLog(shaderProgram)
		);
		return null;
	}

	gl.useProgram(shaderProgram);
	return shaderProgram;
}

function compileShader(
	gl: WebGLRenderingContext,
	type: number,
	source: string
): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) {
		console.error("Unable to create shader");
		return null;
	}
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(
			"An error occurred compiling the shaders:",
			gl.getShaderInfoLog(shader)
		);
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}
