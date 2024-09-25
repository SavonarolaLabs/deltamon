<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { drawScene } from './draw';
	import { loadAllTextures } from './textures';
	import { game } from '$lib/pvp/game';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let textures: { [key: string]: WebGLTexture } = {};
	let currentFrame = 0;
	const animationSpeed = 12;
	let lastTime = 0;
	let isAbilityActive = true;
	let spellPositionStart = -0.65;
	let spellPositionEnd = 0.4;
	let spellPositionX = spellPositionStart;
	let spellPositionY = 0.7;
	const spellSpeed = 0.03;

	// Clear textures
	function clearTextures() {
		if (gl) {
			Object.values(textures).forEach(texture => gl.deleteTexture(texture));
		}
		textures = {};
	}

	// Animate spell movement and draw scene
	function animate(time: number) {
		const elapsedTime = time - lastTime;
		if (elapsedTime >= animationSpeed) {
			currentFrame++;
			lastTime = time;
		}

		if (spellPositionX < spellPositionEnd) {
			spellPositionX += spellSpeed;
		}

		drawScene(
			game,
			gl,
			shaderProgram,
			textures,
			`/abilities/flame10/${currentFrame.toString().padStart(4, '0')}.png`,
			spellPositionX,
			spellPositionY,
			isAbilityActive
		);

		// Request the next frame
		requestAnimationFrame(animate);
	}

	// Initialize WebGL and load textures
	async function initialize() {
		const result = initWebGL(canvas);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			textures = await loadAllTextures(gl);
			requestAnimationFrame(animate);
		}
	}

	// Event listener for animations
	function handleKeydown(event: KeyboardEvent) {
		if (event.key.toUpperCase() === 'Q') {
			currentFrame = 0;
			spellPositionX = spellPositionStart;
			isAbilityActive = true;
		}
	}

	onMount(() => {
		initialize();
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.cancelAnimationFrame(animate);
		clearTextures();
		if (gl) {
			gl.deleteProgram(shaderProgram);
			gl.deleteBuffer(buffers.positionBuffer);
			gl.deleteBuffer(buffers.textureCoordBuffer);
		}
		window.removeEventListener('keydown', handleKeydown);
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100vh;
		display: block;
	}
</style>
