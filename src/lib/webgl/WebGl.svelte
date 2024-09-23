<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { game } from '$lib/pvp/game';
	import { drawScene } from './draw';
	import { loadBackgroundTexture, loadCreatureTexture, loadAbilityTextures } from './textures';
	import { abilityFolders } from './abilityFolders';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let backgroundTexture: WebGLTexture | null = null;
	let creatureTextures: { [key: string]: WebGLTexture } = {};
	let abilityTextures: { [key: string]: WebGLTexture[] } = {};

	// Variables for animation
	let currentFrame = 0;
	const animationSpeed = 30;
	let lastTime = 0;

	function clearTextures() {
		if (gl) {
			if (backgroundTexture) gl.deleteTexture(backgroundTexture);
			Object.values(creatureTextures).forEach(texture => gl.deleteTexture(texture));
			Object.values(abilityTextures).forEach(textureArray => {
				textureArray.forEach(texture => gl.deleteTexture(texture));
			});
		}

		backgroundTexture = null;
		creatureTextures = {};
		abilityTextures = {};
	}

	async function loadTextures() {
		if (!gl) return;

		clearTextures();

		console.log('Loading textures...');

		backgroundTexture = await loadBackgroundTexture(gl, 'castle.png');

		const creatureTexturePromises = game.slots
			.filter(slot => slot.creature)
			.map(async slot => {
				creatureTextures[slot.creature!.img] = await loadCreatureTexture(
					gl,
					`${slot.creature!.img}`
				);
			});

		const abilityTexturePromises = abilityFolders.map(async folder => {
			abilityTextures[folder.name] = await loadAbilityTextures(gl, folder);
		});

		await Promise.all([...creatureTexturePromises, ...abilityTexturePromises]);

		console.log('Textures loaded:', {
			backgroundTexture,
			creatureTextures: Object.keys(creatureTextures),
			abilityTextures: Object.keys(abilityTextures),
		});
	}

	function animate(time: number) {
		const elapsedTime = time - lastTime;
		if (elapsedTime >= animationSpeed) {
			currentFrame = (currentFrame + 1) % (abilityTextures['flame10']?.length || 1);
			lastTime = time;
		}

		console.log(
			'Drawing scene with creatures:',
			game.slots.map(slot => slot.creature?.img).filter(Boolean)
		);

		drawScene(
			gl,
			shaderProgram,
			creatureTextures,
			backgroundTexture,
			abilityTextures,
			currentFrame
		);
		requestAnimationFrame(animate);
	}

	async function initialize() {
		console.log('Initializing WebGL...');
		const result = initWebGL(canvas, game);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			await loadTextures();
			requestAnimationFrame(animate);
		}
	}

	onMount(() => {
		console.log('Component mounted');
		initialize();
	});

	onDestroy(() => {
		console.log('Component destroyed');
		window.cancelAnimationFrame(animate);

		clearTextures();
		if (gl) {
			gl.deleteProgram(shaderProgram);
			gl.deleteBuffer(buffers.positionBuffer);
			gl.deleteBuffer(buffers.textureCoordBuffer);
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
