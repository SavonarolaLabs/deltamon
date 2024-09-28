<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { initWebGL } from '$lib/webgl/initWebGL';
	import { drawScene, initDrawScene } from './draw';
	import { loadAllTextures } from './textures';
	import { game } from '$lib/pvp/game';
	import { playAudio, playAudioAfterDelay } from './audio';
	import { createFlame10, createFlame2, createLightningImpact, createLightningProjectile, createPunch, createWater10, createWater8, LIGHTNING_PROJECTILE_DURATION } from './spells';
	import { initializeSlotRenderData } from './slotRenderData';
	import { applyHoverAnimation } from './hoverAnimation';
	import type { DrawSpell, SlotRenderData, TextureMetadataMap, ImpactAnimation, JumpAnimation } from '$lib/types';
	import { startMatch } from '$lib/pvp/gameloop';

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;
	let textures: TextureMetadataMap = {};

	let drawSpells: DrawSpell[] = [];
	let slotRenderData: SlotRenderData[] = [];
	let animationFrameId: number;

	let impactAnimations: ImpactAnimation[] = [];
	let jumpAnimations: JumpAnimation[] = [];

	const activeSlotIndex = 1;
	const impactDuration = 300;
	const kickOffset = 60;

	let activeSlotMoveStartTime: number | null = null;
	const activeSlotMoveDuration = 200;
	const activeSlotMoveOffset = -20;

	const keyToSlotIndex = {
		Q: 6,
		W: 7,
		E: 8,
		A: 9,
		S: 10,
		D: 11,
	};

	let spellMode = 'lightning';

	async function initialize() {
		const result = initWebGL(canvas);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			textures = await loadAllTextures(gl);
			initDrawScene(gl, shaderProgram);
			slotRenderData = initializeSlotRenderData(game, gl);
			handleResize();
			animationFrameId = requestAnimationFrame(animate);
		}
	}

	function handleResize() {
		if (canvas && gl) {
			const dpr = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			gl.viewport(0, 0, canvas.width, canvas.height);

			slotRenderData = initializeSlotRenderData(game, gl);
		}
	}

	function clearTextures() {
		if (gl) {
			Object.values(textures).forEach(({ texture }) => gl.deleteTexture(texture));
		}
		textures = {};
	}

	function animate(time: number) {
		updateSpells(time);
		updateActiveCreature(time);
		updateActiveSlotMovement(time);
		updateImpactAnimation(time);
		updateJumpAnimations(time);

		drawScene(game, slotRenderData, gl, shaderProgram, textures, drawSpells);
		animationFrameId = requestAnimationFrame(animate);
	}

	function updateSpells(time: number) {
		drawSpells.forEach(spell => {
			if (!spell.startTime) spell.startTime = time;
			const elapsedTime = time - spell.startTime;
			const progress = Math.min(elapsedTime / spell.duration, 1);

			// Update frame for grid-based textures
			if (spell.abilityFolder.isGridFormat) {
				const totalFrames = spell.abilityFolder.frameCount;
				spell.currentFrame = Math.floor(progress * (totalFrames - 1));
			} else {
				// Update frame for non-grid textures
				const totalFrames = spell.abilityFolder.frameCount;
				spell.currentFrame = Math.floor(progress * (totalFrames - 1));
				spell.texturePath = `/abilities/${spell.abilityFolder.name}/${spell.currentFrame.toString().padStart(4, '0')}.png`;
			}

			// Ensure movement is applied correctly
			if (progress > 0.3) {
				const moveProgress = (progress - 0.3) / 0.7;
				spell.x = spell.startX + (spell.endX - spell.startX) * moveProgress;
				spell.y = spell.startY + (spell.endY - spell.startY) * moveProgress;
			}

			if (progress >= 1) spell.draw = false;
		});

		drawSpells = drawSpells.filter(spell => spell.draw);
	}

	function updateActiveCreature(time: number) {
		if (jumpAnimations.length === 0) {
			const activeCreature = game.activeCreature;
			if (activeCreature) {
				const activeCreatureSlotIndex = game.slots.findIndex(slot => slot.creature?.bcId === activeCreature.bcId);
				if (activeCreatureSlotIndex !== -1 && slotRenderData[activeCreatureSlotIndex]) {
					slotRenderData[activeCreatureSlotIndex] = applyHoverAnimation(slotRenderData[activeCreatureSlotIndex], time);
				}
			}
		}
	}

	function updateActiveSlotMovement(time: number) {
		if (activeSlotMoveStartTime && slotRenderData[activeSlotIndex]) {
			const elapsedMoveTime = time - activeSlotMoveStartTime;
			const moveProgress = Math.min(elapsedMoveTime / activeSlotMoveDuration, 1);
			const easedMoveProgress = Math.sin(moveProgress * Math.PI);

			slotRenderData[activeSlotIndex].x = slotRenderData[activeSlotIndex].originalX + activeSlotMoveOffset * easedMoveProgress;

			if (moveProgress >= 1) {
				slotRenderData[activeSlotIndex].x = slotRenderData[activeSlotIndex].originalX;
				activeSlotMoveStartTime = null;
			}
		}
	}

	function updateImpactAnimation(time: number) {
		impactAnimations = impactAnimations.filter(impact => {
			const { targetSlotIndex, startTime } = impact;
			const slot = slotRenderData[targetSlotIndex];

			if (!slot) {
				return false;
			}

			const elapsedImpactTime = time - startTime;
			const impactProgress = Math.min(elapsedImpactTime / impactDuration, 1);
			const easedImpactProgress = Math.sin(impactProgress * Math.PI);

			slot.x = slot.originalX + kickOffset * easedImpactProgress;
			slot.whiteFlash = 0.9 * (1 - impactProgress);

			if (impactProgress >= 1) {
				slot.x = slot.originalX;
				slot.whiteFlash = 0;
				return false;
			}

			return true;
		});
	}

	function updateJumpAnimations(time: number) {
		const easeInCubic = (t: number) => t * t * t;

		jumpAnimations = jumpAnimations.filter(animation => {
			const { slotIndex, targetSlotIndex, startTime, duration, startX, startY, targetX, targetY, jumpHeight, phase } = animation;
			const slot = slotRenderData[slotIndex];

			if (!slot) {
				return false;
			}

			const elapsed = time - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easedProgress = easeInCubic(progress);

			if (phase === 'jump') {
				slot.x = startX + (targetX - startX) * easedProgress;
				slot.y = startY + (targetY - startY) * easedProgress - jumpHeight * Math.sin(easedProgress * Math.PI);

				if (progress >= 1) {
					// At the end of the jump, trigger impact, and start return phase
					playAudio('/mp3/punch2.mp3', 1, 0.0);
					const targetSlot = slotRenderData[targetSlotIndex];
					const punchImpact = createPunch(targetSlot, 'slash3');
					drawSpells.push(punchImpact);

					impactAnimations.push({
						targetSlotIndex: targetSlotIndex,
						startTime: performance.now(),
					});

					// Start return phase
					animation.startTime = time;
					animation.duration = duration / 1.2;
					animation.phase = 'return';
					animation.startX = slot.x;
					animation.startY = slot.y;
					animation.targetX = slot.originalX;
					animation.targetY = slot.originalY;

					return true; // Keep the animation in the array
				} else {
					return true; // Keep the animation in the array
				}
			} else if (phase === 'return') {
				slot.x = startX + (targetX - startX) * progress;
				slot.y = startY + (targetY - startY) * progress;

				if (progress >= 1) {
					// Return animation finished
					slot.x = slot.originalX;
					slot.y = slot.originalY;
					slot.isHovered = true;
					return false; // Remove the animation from the array
				} else {
					return true; // Keep the animation in the array
				}
			}
		});
	}

	function castFireball(targetIndex: number) {
		const sourceSlot = slotRenderData[activeSlotIndex];
		const targetSlot = slotRenderData[targetIndex];

		playAudio('/mp3/fireball.mp3', 1, 0.0);
		const flame10 = createFlame10(sourceSlot, targetSlot, 'flame10');
		drawSpells.push(flame10);
		activeSlotMoveStartTime = performance.now();
		playAudioAfterDelay('/mp3/blast.mp3', 350, 1.1);

		setTimeout(() => {
			const flame2 = createFlame2(targetSlot, 'flame2');
			drawSpells.push(flame2);

			impactAnimations.push({
				targetSlotIndex: targetIndex,
				startTime: performance.now(),
			});
		}, 500);
	}

	function castWaterball(targetIndex: number) {
		const sourceSlot = slotRenderData[activeSlotIndex];
		const targetSlot = slotRenderData[targetIndex];

		playAudio('/mp3/water/22.mp3', 1, 0.0);
		const water10 = createWater8(sourceSlot, targetSlot, 'water8');
		drawSpells.push(water10);
		activeSlotMoveStartTime = performance.now();
		playAudioAfterDelay('/mp3/water/46.mp3', 350, 1.1);

		setTimeout(() => {
			const water2 = createWater10(targetSlot, 'water10');
			drawSpells.push(water2);

			impactAnimations.push({
				targetSlotIndex: targetIndex,
				startTime: performance.now(),
			});
		}, 500);
	}

	function castLightning(targetIndex: number) {
		const sourceSlot = slotRenderData[activeSlotIndex];
		const targetSlot = slotRenderData[targetIndex];

		const lightningProjectile = createLightningProjectile(sourceSlot, targetSlot, 'lightnings1_0003');
		drawSpells.push(lightningProjectile);
		playAudio('/mp3/lightning/16.mp3', 1.3, 0.0);
		playAudioAfterDelay('/mp3/lightning/06.mp3', 300, 1);

		setTimeout(() => {
			const lightningImpact = createLightningImpact(targetSlot, 'lightnings1_0000');
			drawSpells.push(lightningImpact);

			impactAnimations.push({
				targetSlotIndex: targetIndex,
				startTime: performance.now(),
			});
		}, LIGHTNING_PROJECTILE_DURATION);
	}

	function castJumpAttack(targetIndex: number) {
		const sourceSlot = slotRenderData[activeSlotIndex];
		const targetSlot = slotRenderData[targetIndex];
		const jumpDuration = 300;
		const jumpHeight = 150;
		const stopDistance = 330;

		const originalX = sourceSlot.originalX;
		const originalY = sourceSlot.originalY;

		const targetX = targetSlot.x - stopDistance * Math.sign(targetSlot.x - sourceSlot.x);
		const targetY = targetSlot.y;

		sourceSlot.x = originalX;
		sourceSlot.y = originalY;
		sourceSlot.isHovered = false;

		// Create a new JumpAnimation object
		const jumpAnimation: JumpAnimation = {
			slotIndex: activeSlotIndex,
			targetSlotIndex: targetIndex,
			startTime: performance.now(),
			duration: jumpDuration,
			startX: originalX,
			startY: originalY,
			targetX: targetX,
			targetY: targetY,
			jumpHeight: jumpHeight,
			phase: 'jump',
		};

		// Add to jumpAnimations array
		jumpAnimations.push(jumpAnimation);
	}

	function handleKeydown(event: KeyboardEvent) {
		const key = event.key.toUpperCase();

		if (key === '1') {
			spellMode = 'fireball';
		} else if (key === '2') {
			spellMode = 'waterball';
		} else if (key === '3') {
			spellMode = 'lightning';
		} else if (key === '4') {
			spellMode = 'jumpAttack';
		} else if (keyToSlotIndex[key] !== undefined) {
			// Cast the spell based on the current spell mode
			if (spellMode === 'lightning') {
				castLightning(keyToSlotIndex[key]);
			} else if (spellMode === 'fireball') {
				castFireball(keyToSlotIndex[key]);
			} else if (spellMode === 'waterball') {
				castWaterball(keyToSlotIndex[key]);
			} else if (spellMode === 'jumpAttack') {
				castJumpAttack(keyToSlotIndex[key]);
			}
		}
	}

	onMount(() => {
		startMatch(game);
		game.activeCreature = game.slots[1].creature;
		initialize();
		window.addEventListener('keydown', handleKeydown);
		window.addEventListener('resize', handleResize);
		handleResize();
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
		window.removeEventListener('resize', handleResize);
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		display: block;
	}
</style>
