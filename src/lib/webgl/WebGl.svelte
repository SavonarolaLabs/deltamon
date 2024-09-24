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
	let currentAbilityIndex: number | null = null; // Start without ability animation
	const animationSpeed = 30; // Speed of animation (ms per frame)
	let lastTime = 0;
	let isAbilityActive = false; // To track if an ability is playing

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

		backgroundTexture = await loadBackgroundTexture(gl, 'current.png');

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

		drawScene(gl, shaderProgram, creatureTextures, backgroundTexture, abilityTextures, null, 0);

		// If an ability is active, animate it
		if (isAbilityActive && currentAbilityIndex !== null) {
			const abilityNames = Object.keys(abilityTextures);
			const currentAbilityName = abilityNames[currentAbilityIndex];
			const currentAbilityFrames = abilityTextures[currentAbilityName] || [];

			if (elapsedTime >= animationSpeed) {
				// Update frame if not yet finished
				currentFrame++;
				lastTime = time;
			}

			if (currentFrame < currentAbilityFrames.length) {
				// Draw the scene with the current ability frame
				drawScene(
					gl,
					shaderProgram,
					creatureTextures,
					backgroundTexture,
					abilityTextures,
					currentAbilityName,
					currentFrame
				);
			} else {
				isAbilityActive = false;
				currentAbilityIndex = null; // Reset ability index
			}
		}

		// Always request the next animation frame, regardless of the ability state
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
		window.addEventListener('keydown', handleKeydown);
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
		window.removeEventListener('keydown', handleKeydown);
	});

	// Mapping of keys to ability indices
	const keyToAbilityIndex = {
		Q: 0,
		W: 1,
		E: 2,
		R: 3,
		D: 4,
		F: 5,
	};

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key.toUpperCase();
		if (keyToAbilityIndex[key] !== undefined) {
			currentAbilityIndex = keyToAbilityIndex[key];
			console.log({ currentAbilityIndex });
			currentFrame = 0; // Reset the frame for the new ability
			isAbilityActive = true; // Set the ability as active
		}
	}
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100vh;
		display: block;
	}
</style>
