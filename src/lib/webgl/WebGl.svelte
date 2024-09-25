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

	let currentFrame = 0;
	const animationSpeed = 12;
	let lastTime = 0;
	let isAbilityActive = true; // Always active for demo
	let spellPositionStart = -0.65; // Start position on the left
	let spellPositionEnd = 0.4; // Start position on the left
	let spellPositionX = spellPositionStart; // Start position on the left
	let spellPositionY = 0.7; // Start podsition on the left
	const spellSpeed = 0.03; // Movement speed of the spell

	// Clear and load textures
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
	}

	// Animate spell movement from left to right
	function animate(time: number) {
		const elapsedTime = time - lastTime;
		//lastTime = time;

		// Move the spell to the right
		spellPositionX += spellSpeed;

		// Update frames based on time and animation speed
		if (elapsedTime >= animationSpeed) {
			currentFrame++;
			lastTime = time;
		}

		// Loop the frame if it reaches the end
		if (currentFrame >= abilityTextures['flame10'].length) {
			currentFrame = 0;
			isAbilityActive = false;
		}

		if (spellPositionX > spellPositionEnd) {
			spellPositionX = spellPositionEnd; // Reset to start on the left once it leaves the screen
		}

		drawScene(
			game,
			gl,
			shaderProgram,
			creatureTextures,
			backgroundTexture,
			abilityTextures,
			'flame10', // Spell name from abilityFolders
			currentFrame,
			spellPositionX, // Pass the X position of the spell
			spellPositionY, // Y position remains static for now
			isAbilityActive
		);

		// Request the next animation frame
		requestAnimationFrame(animate);
	}

	// Initialize WebGL
	async function initialize() {
		const result = initWebGL(canvas, game);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			await loadTextures();
			requestAnimationFrame(animate);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key.toUpperCase();
		if (key === 'Q') {
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
