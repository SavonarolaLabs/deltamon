import { abilityFolders } from './abilityFolders';
import type { DrawSpell, SlotRenderData } from '$lib/types';

const FLAME10_DURATION = 500; // Duration in ms for flame10
const FLAME2_DURATION = 200; // Duration in ms for flame2

// Create flame10 (fireball) spell
export function createFlame10(
	sourceSlot: SlotRenderData,
	targetSlot: SlotRenderData,
	aspectRatio: number // Pass the aspect ratio
): DrawSpell {
	// Adjust the y-coordinates based on the aspect ratio
	const adjustedSourceY = sourceSlot.y * aspectRatio;
	const adjustedTargetY = targetSlot.y * aspectRatio;

	const dx = targetSlot.x - sourceSlot.x;
	const dy = adjustedTargetY - adjustedSourceY;
	const angle = Math.atan2(dy, dx);

	return {
		currentFrame: 0,
		duration: FLAME10_DURATION,
		lastTime: 0,
		startX: sourceSlot.x,
		startY: sourceSlot.y,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityFolders.find(a => a.name === 'flame10')!,
		texturePath: `/abilities/flame10/0000.png`,
		x: sourceSlot.x - 0.12,
		y: sourceSlot.y,
		scale: 0.5,
		draw: true,
		z: 3,
		angle, // Include the calculated angle
	};
}

// Create flame2 (impact) spell
export function createFlame2(targetSlot: SlotRenderData): DrawSpell {
	return {
		currentFrame: 0,
		duration: FLAME2_DURATION,
		lastTime: 0,
		startX: targetSlot.x,
		startY: targetSlot.y,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityFolders.find(a => a.name === 'flame2')!,
		texturePath: `/abilities/flame2/0000.png`,
		x: targetSlot.x,
		y: targetSlot.y,
		scale: 0.7,
		draw: true,
		z: 2,
		angle: 0, // No rotation needed for flame2
	};
}
