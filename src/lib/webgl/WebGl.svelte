<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { drawScene, initDrawScene } from './draw';
	import { loadAllTextures } from './textures';
	import { game } from '$lib/pvp/game';
	import { playAudio, playAudioAfterDelay } from './audio';
	import { createFlame10, createFlame2 } from './spells';
	import type { DrawSpell } from '$lib/types';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let textures: { [key: string]: WebGLTexture } = {};
	let drawSpells: DrawSpell[] = [];

	// Initializes WebGL and textures
	async function initialize() {
		const result = initWebGL(canvas);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			textures = await loadAllTextures(gl);
			initDrawScene(gl, shaderProgram);
			requestAnimationFrame(animate);
		}
	}

	// Clears all textures
	function clearTextures() {
		if (gl) {
			Object.values(textures).forEach(texture => gl.deleteTexture(texture));
		}
		textures = {};
	}

	// Adds a new fireball spell to the scene
	function castFireball() {
		playAudio('/mp3/hadouken.mp3', 1.1, 0.3);
		const flame10 = createFlame10();
		drawSpells.push(flame10);

		playAudioAfterDelay('/mp3/Beating Punch.mp3', 350);
		setTimeout(() => {
			const flame2 = createFlame2(flame10);
			drawSpells.push(flame2);
		}, 500);
	}

	// Updates animation frame based on time
	function animate(time: number) {
		drawSpells.forEach(spell => {
			if (!spell.startTime) spell.startTime = time;

			const elapsedTime = time - spell.startTime;
			const progress = Math.min(elapsedTime / spell.duration, 1);

			// Split movement into two phases: static (first 30%) and moving (remaining 70%)
			if (spell.abilityFolder.name === 'flame10') {
				if (progress > 0.3) {
					const moveProgress = (progress - 0.3) / 0.7; // Normalize movement phase progress
					spell.x = spell.startX + (spell.endX - spell.startX) * moveProgress;
				}
				spell.y = spell.startY; // No vertical movement in this example
			}

			// Calculate frame based on full progress
			spell.currentFrame = Math.floor(progress * (spell.abilityFolder.frameCount - 1));
			spell.texturePath = `/abilities/${spell.abilityFolder.name}/${spell.currentFrame.toString().padStart(4, '0')}.png`;

			// Mark spell as done if progress reaches 1
			if (progress >= 1) spell.draw = false;
		});

		// Filter out completed spells and draw the scene
		drawSpells = drawSpells.filter(spell => spell.draw);
		drawScene(game, gl, shaderProgram, textures, drawSpells);

		requestAnimationFrame(animate);
	}

	// Handle 'Q' keydown event to cast fireball
	function handleKeydown(event: KeyboardEvent) {
		if (event.key.toUpperCase() === 'Q') castFireball();
	}

	// Set up and tear down
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
