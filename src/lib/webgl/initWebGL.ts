import { initBuffers } from './buffers';
import { drawScene } from './draw';
import { initShaders } from './shaders';
import { loadCreatureTexture } from './textures';

export function initWebGL(
	canvas: HTMLCanvasElement,
	gameState: any
): {
	gl: WebGLRenderingContext;
	shaderProgram: WebGLProgram;
	buffers: any;
} | null {
	// Get WebGL context
	const gl = canvas.getContext('webgl', { alpha: true });

	if (!gl) {
		console.error('Unable to initialize WebGL. Your browser may not support it.');
		return null;
	}

	// Resize canvas to match display size
	const displayWidth = canvas.clientWidth;
	const displayHeight = canvas.clientHeight;
	canvas.width = displayWidth;
	canvas.height = displayHeight;
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// Initialize shaders and buffers
	const shaderProgram = initShaders(gl);
	if (!shaderProgram) {
		console.error('Failed to initialize shader program');
		return null;
	}
	const buffers = initBuffers(gl);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	// Set clear color and clear the screen
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Load creature textures (asynchronously)
	const creatureTextures: { [key: string]: WebGLTexture } = {};
	let texturesLoaded = 0;
	const totalTextures = gameState.slots.filter((slot: any) => slot.creature).length;

	gameState.slots.forEach((slot: any) => {
		if (slot.creature) {
			loadCreatureTexture(gl, slot.creature.img, texture => {
				creatureTextures[slot.creature.bcId] = texture;
				texturesLoaded++;
				if (texturesLoaded === totalTextures) {
					// All textures loaded, now draw the scene
					drawScene(gl, shaderProgram, creatureTextures);
				}
			});
		}
	});

	return { gl, shaderProgram, buffers };
}
