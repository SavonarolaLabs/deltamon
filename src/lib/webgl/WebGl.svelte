<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { drawScene, initDrawScene } from './draw';
	import { loadAllTextures } from './textures';
	import { game } from '$lib/pvp/game';
	import { playAudio, playAudioAfterDelay } from './audio';
	import { createFlame10, createFlame2 } from './spells';
	import { initializeSlotRenderData } from './slotRenderData';
	import { applyHoverAnimation } from './hoverAnimation';
	import type { DrawSpell, SlotRenderData, TextureMetadataMap } from '$lib/types';
	import { startMatch } from '$lib/pvp/gameloop';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let textures: TextureMetadataMap = {};

	let drawSpells: DrawSpell[] = [];
	let slotRenderData: SlotRenderData[] = [];
	let animationFrameId: number;

	const activeSlotIndex = 1;
	let targetSlotIndex = 6;
	let impactStartTime: number | null = null;
	const impactDuration = 300;
	const kickOffset = 0.02;

	let activeSlotMoveStartTime: number | null = null;
	const activeSlotMoveDuration = 200;
	const activeSlotMoveOffset = -0.01;

	const keyToSlotIndex = {
		Q: 6,
		W: 7,
		E: 8,
		A: 9,
		S: 10,
		D: 11,
	};

	async function initialize() {
		const result = initWebGL(canvas);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			textures = await loadAllTextures(gl);
			initDrawScene(gl, shaderProgram);
			slotRenderData = initializeSlotRenderData(game);
			if (slotRenderData[activeSlotIndex]) {
				slotRenderData[activeSlotIndex].zIndex = 1;
			}
			animationFrameId = requestAnimationFrame(animate);
		}
	}

	function clearTextures() {
		if (gl) {
			Object.values(textures).forEach(({ texture }) => gl.deleteTexture(texture));
		}
		textures = {};
	}

	function castFireball(targetIndex: number) {
		targetSlotIndex = targetIndex;
		const sourceSlot = slotRenderData[activeSlotIndex];
		const targetSlot = slotRenderData[targetSlotIndex];
		playAudio('/mp3/hadouken.mp3', 1.1, 0.3);
		const flame10 = createFlame10(sourceSlot, targetSlot);
		drawSpells.push(flame10);
		activeSlotMoveStartTime = performance.now();
		playAudioAfterDelay('/mp3/Beating Punch.mp3', 350);
		setTimeout(() => {
			const flame2 = createFlame2(targetSlot);
			drawSpells.push(flame2);
			impactStartTime = performance.now();
		}, 500);
	}

	function animate(time: number) {
		updateSpells(time);
		updateActiveCreature(time);
		updateActiveSlotMovement(time);
		updateImpactAnimation(time);

		drawScene(game, slotRenderData, gl, shaderProgram, textures, drawSpells);
		animationFrameId = requestAnimationFrame(animate);
	}

	function updateSpells(time: number) {
		drawSpells.forEach(spell => {
			if (!spell.startTime) spell.startTime = time;
			const elapsedTime = time - spell.startTime;
			const progress = Math.min(elapsedTime / spell.duration, 1);
			spell.currentFrame = Math.floor(progress * (spell.abilityFolder.frameCount - 1));
			spell.texturePath = `/abilities/${spell.abilityFolder.name}/${spell.currentFrame
				.toString()
				.padStart(4, '0')}.png`;

			if (spell.abilityFolder.name === 'flame10' && progress > 0.3) {
				const moveProgress = (progress - 0.3) / 0.7;
				spell.x = spell.startX + (spell.endX - spell.startX) * moveProgress;
				spell.y = spell.startY + (spell.endY - spell.startY) * moveProgress;
			}

			if (progress >= 1) spell.draw = false;
		});

		drawSpells = drawSpells.filter(spell => spell.draw);
	}

	function updateActiveCreature(time: number) {
		const activeCreature = game.activeCreature;
		if (activeCreature) {
			const activeCreatureSlotIndex = game.slots.findIndex(slot => slot.creature?.bcId === activeCreature.bcId);
			if (activeCreatureSlotIndex !== -1 && slotRenderData[activeCreatureSlotIndex]) {
				slotRenderData[activeCreatureSlotIndex] = applyHoverAnimation(
					slotRenderData[activeCreatureSlotIndex],
					time
				);
			}
		}
	}

	function updateActiveSlotMovement(time: number) {
		if (activeSlotMoveStartTime && slotRenderData[activeSlotIndex]) {
			const elapsedMoveTime = time - activeSlotMoveStartTime;
			const moveProgress = Math.min(elapsedMoveTime / activeSlotMoveDuration, 1);
			const easedMoveProgress = Math.sin(moveProgress * Math.PI);

			slotRenderData[activeSlotIndex].x =
				slotRenderData[activeSlotIndex].originalX + activeSlotMoveOffset * easedMoveProgress;

			if (moveProgress >= 1) {
				slotRenderData[activeSlotIndex].x = slotRenderData[activeSlotIndex].originalX;
				activeSlotMoveStartTime = null;
			}
		}
	}

	function updateImpactAnimation(time: number) {
		if (impactStartTime && slotRenderData[targetSlotIndex]) {
			const elapsedImpactTime = time - impactStartTime;
			const impactProgress = Math.min(elapsedImpactTime / impactDuration, 1);
			const easedImpactProgress = Math.sin(impactProgress * Math.PI);

			slotRenderData[targetSlotIndex].x =
				slotRenderData[targetSlotIndex].originalX + kickOffset * easedImpactProgress;
			slotRenderData[targetSlotIndex].whiteFlash = 0.9 * (1 - impactProgress);

			if (impactProgress >= 1) {
				slotRenderData[targetSlotIndex].x = slotRenderData[targetSlotIndex].originalX;
				slotRenderData[targetSlotIndex].whiteFlash = 0;
				impactStartTime = null;
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key.toUpperCase();
		//@ts-ignore
		if (keyToSlotIndex[key] !== undefined) {
			//@ts-ignore
			castFireball(keyToSlotIndex[key]);
		}
	}

	onMount(() => {
		startMatch(game);
		game.activeCreature = game.slots[1].creature;
		initialize();
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		window.cancelAnimationFrame(animationFrameId);
		clearTextures();
		if (gl && shaderProgram && buffers) {
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
