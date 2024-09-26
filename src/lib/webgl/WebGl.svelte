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

	let drawSpells: DrawSpell[] = [
		{
			currentFrame: 0,
			spellSpeed: 0.03,
			animationSpeed: 12,
			lastTime: 0,
			startX: -0.65,
			startY: 0.7,
			endX: 0.4,

			abilityFolder: abilityFolders.find(a => a.name == 'flame10')!,
			texturePath: `/abilities/flame10/0000.png`,
			x: -0.65,
			y: 0.7,
			scale: 0.5,
			draw: true,
		},
	];

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

			if (spell.currentFrame >= spell.abilityFolder.frameCount) {
				spell.draw = false;
			}

			spell.texturePath = `/abilities/${spell.abilityFolder.name}/${spell.currentFrame.toString().padStart(4, '0')}.png`;
		}

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

	// Event listener for animations
	function handleKeydown(event: KeyboardEvent) {
		if (event.key.toUpperCase() === 'Q') {
			for (const spell of drawSpells) {
				spell.currentFrame = 0;
				spell.x = spell.startX;
				spell.draw = true;
				spell.lastTime = 0;
			}
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
