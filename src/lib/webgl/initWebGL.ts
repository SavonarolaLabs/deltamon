import { initBuffers } from './buffers';
import { initShaders } from './shaders';

interface WebGLInitResult {
	gl: WebGLRenderingContext;
	shaderProgram: WebGLProgram;
	buffers: any;
}

export function initWebGL(
	canvas: HTMLCanvasElement,
	gameState: any,
	alpha: boolean = false
): WebGLInitResult | null {
	// Get WebGL context
	const gl = canvas.getContext('webgl', { alpha });

	if (!gl) {
		console.error('Unable to initialize WebGL. Your browser may not support it.');
		return null;
	}

	// Resize canvas to match display size
	resizeCanvasToDisplaySize(canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

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

	// Set clear color and clear the screen
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	return { gl, shaderProgram, buffers };
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): void {
	const { width, height } = canvas.getBoundingClientRect();
	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
	}
}
