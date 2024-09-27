import { initBuffers } from './buffers';
import { initShaders } from './shaders';

interface WebGLInitResult {
	gl: WebGLRenderingContext;
	shaderProgram: WebGLProgram;
	buffers: any;
}

export function initWebGL(canvas: HTMLCanvasElement): WebGLInitResult | null {
	// Get WebGL context
	const gl = canvas.getContext('webgl', { alpha: true });

	if (!gl) {
		console.error('Unable to initialize WebGL. Your browser may not support it.');
		return null;
	}

	// Initialize shaders and buffers
	const shaderProgram = initShaders(gl);
	if (!shaderProgram) {
		console.error('Failed to initialize shader program');
		return null;
	}
	const buffers = initBuffers(gl);

	// Enable alpha blending
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	// Set clear color
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background

	return { gl, shaderProgram, buffers };
}
