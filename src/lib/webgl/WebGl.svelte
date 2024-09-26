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

	// Clear textures
	function clearTextures() {
		if (gl) {
			Object.values(textures).forEach(texture => gl.deleteTexture(texture));
		}
		textures = {};
	}

	// Animate spell movement and draw scene
	function animate(time: number) {
		for (const spell of drawSpells) {
			const elapsedTime = time - spell.lastTime;

			if (elapsedTime >= spell.duration / spell.abilityFolder.frameCount) {
				spell.currentFrame++;
				spell.currentFrame++;
				spell.lastTime = time;
			}

			// Interpolate flame10's position based on time
			if (spell.abilityFolder.name === 'flame10') {
				if (!spell.startTime) spell.startTime = time; // Set startTime only once
				const progress = Math.min((time - spell.startTime) / spell.duration, 1); // Clamp between 0 and 1
				spell.x = spell.startX + (spell.endX - spell.startX) * progress;
				spell.y = spell.startY; // No vertical movement in this example
			}

			// Check if spell is completed
			if (spell.currentFrame >= spell.abilityFolder.frameCount) {
				spell.draw = false;
			}

			spell.texturePath = `/abilities/${spell.abilityFolder.name}/${spell.currentFrame.toString().padStart(4, '0')}.png`;
		}

		// Filter out completed spells
		drawSpells = drawSpells.filter(spell => spell.draw);

		drawScene(game, gl, shaderProgram, textures, drawSpells);

		requestAnimationFrame(animate);
	}

	// Initialize WebGL and load textures
	async function initialize() {
		const result = initWebGL(canvas);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			textures = await loadAllTextures(gl);
			initDrawScene(gl, shaderProgram); // Initialize buffers and attributes
			requestAnimationFrame(animate);
		}
	}

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

	// Event listener for animations
	function handleKeydown(event: KeyboardEvent) {
		if (event.key.toUpperCase() === 'Q') {
			castFireball();
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
