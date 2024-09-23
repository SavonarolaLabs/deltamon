<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { game } from '$lib/pvp/game';
	import { drawScene } from './draw';
	import { loadBackgroundTexture, loadCreatureTexture } from './textures';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let backgroundTexture: WebGLTexture | null = null;
	let creatureTextures: { [key: string]: WebGLTexture } = {};

	async function loadTextures() {
		if (!gl) return;

		// Load the background and creature textures simultaneously
		const backgroundTexturePromise = loadBackgroundTexture(gl, 'castle.png');
		const creatureTexturePromises = game.slots
			.filter(slot => slot.creature && !creatureTextures[slot.creature.img]) // Filter valid slots
			.map(slot => {
				return loadCreatureTexture(gl, `${slot.creature!.img}`).then(texture => {
					creatureTextures[slot.creature!.img] = texture;
				});
			});

		// Wait for all textures to load before proceeding
		try {
			backgroundTexture = await backgroundTexturePromise;
			await Promise.all(creatureTexturePromises);
		} catch (error) {
			console.error('Failed to load textures:', error);
		}
	}

	function resizeCanvasToDisplaySize() {
		if (!canvas || !gl) return;

		const displayWidth = canvas.clientWidth;
		const displayHeight = canvas.clientHeight;

		if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
		}

		gl.viewport(0, 0, canvas.width, canvas.height);
	}

	function draw() {
		if (!gl || !shaderProgram || !buffers || !backgroundTexture) return;

		resizeCanvasToDisplaySize();
		drawScene(gl, shaderProgram, creatureTextures, backgroundTexture);
	}

	async function initialize() {
		const result = initWebGL(canvas, game);
		if (result) {
			({ gl, shaderProgram, buffers } = result);

			// Load textures first
			await loadTextures();

			// Draw the scene once the textures are loaded
			draw();

			// Add resize event listener to redraw on resize
			window.addEventListener('resize', draw);
		} else {
			console.error('WebGL initialization failed');
		}
	}

	onMount(() => {
		initialize();
	});

	onDestroy(() => {
		window.removeEventListener('resize', draw);

		// Clean up WebGL resources
		if (gl) {
			gl.deleteProgram(shaderProgram);
			gl.deleteBuffer(buffers.positionBuffer);
			gl.deleteBuffer(buffers.textureCoordBuffer);
			// Delete textures
			if (backgroundTexture) gl.deleteTexture(backgroundTexture);
			Object.values(creatureTextures).forEach(texture => gl.deleteTexture(texture));
		}
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
