<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { drawScene, initDrawScene } from './draw';
	import { loadAllTextures } from './textures';
	import { game } from '$lib/pvp/game';
	import { abilityFolders } from './abilityFolders';
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
			if (elapsedTime >= spell.animationSpeed) {
				spell.currentFrame++;
				spell.lastTime = time;
			}

			if (spell.x < spell.endX) {
				spell.x += spell.spellSpeed;
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
		const audio = new Audio('/mp3/hadouken.mp3');
		audio.playbackRate = 1.1;
		audio.currentTime = 0.3;
		audio.play();

		const flame10 = {
			currentFrame: 0,
			spellSpeed: 0.03,
			animationSpeed: 12,
			lastTime: 0,
			startX: -0.65,
			startY: 0.7,
			endX: 0.35,
			abilityFolder: abilityFolders.find(a => a.name == 'flame10')!,
			texturePath: `/abilities/flame10/0000.png`,
			x: -0.65,
			y: 0.7,
			scale: 0.5,
			draw: true,
			z: 1,
		};

		drawSpells.push(flame10);

		setTimeout(() => {
			//https://soundeffectpro.com/tag/fighting-punch
			const audio = new Audio('/mp3/Beating Punch.mp3');
			audio.play();
		}, 350);

		setTimeout(() => {
			const flame2 = {
				currentFrame: 0,
				spellSpeed: 0,
				animationSpeed: 15,
				lastTime: 0,
				startX: flame10.endX * 1.4,
				startY: flame10.startY,
				endX: flame10.endX,
				abilityFolder: abilityFolders.find(a => a.name == 'flame2')!,
				texturePath: `/abilities/flame2/0000.png`,
				x: flame10.endX * 1.4,
				y: flame10.startY * 0.9,
				scale: 0.7,
				draw: true,
				z: 0,
			};
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
