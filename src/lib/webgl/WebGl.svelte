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
	let currentAbilityIndex = 0;
	const animationSpeed = 30; // Speed of animation (ms per frame)
	let lastTime = 0;

	// Function to clear textures
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

	// Function to load textures
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

	// Function to animate abilities
	function animate(time: number) {
		const elapsedTime = time - lastTime;

		// Get the current ability name and its textures
		const abilityNames = Object.keys(abilityTextures);
		const currentAbilityName = abilityNames[currentAbilityIndex];
		const currentAbilityFrames = abilityTextures[currentAbilityName] || [];

		if (elapsedTime >= animationSpeed) {
			// Update frame
			currentFrame = (currentFrame + 1) % currentAbilityFrames.length;
			lastTime = time;

			// If we've looped through all frames of the current ability, move to the next one
			if (currentFrame === 0) {
				currentAbilityIndex = (currentAbilityIndex + 1) % abilityNames.length;
			}
		}

		console.log(
			'Drawing scene with creatures:',
			game.slots.map(slot => slot.creature?.img).filter(Boolean)
		);

		// Draw the scene with the current frame of the current ability
		drawScene(
			gl,
			shaderProgram,
			creatureTextures,
			backgroundTexture,
			abilityTextures,
			currentAbilityName,
			currentFrame
		);

		// Request the next frame
		requestAnimationFrame(animate);
	}

	// Function to initialize WebGL and start animation
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
