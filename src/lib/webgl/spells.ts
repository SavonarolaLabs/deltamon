import { abilityFolders } from './abilityFolders';
import type { DrawSpell, SlotRenderData } from '$lib/types';

const FLAME10_DURATION = 600; // Duration in ms for flame10
const FLAME2_DURATION = 300; // Duration in ms for flame2
const WATER10_DURATION = 600; // Duration in ms for water10
const WATER2_DURATION = 350; // Duration in ms for water2

// Create flame10 (fireball) spell
export function createFlame10(sourceSlot: SlotRenderData, targetSlot: SlotRenderData, abilityFolder: string): DrawSpell {
	const dx = targetSlot.x - sourceSlot.x;
	const dy = targetSlot.y - sourceSlot.y;
	const angle = Math.atan2(dy, dx);

	const abilityData = abilityFolders.find(a => a.name === abilityFolder)!;

	return {
		currentFrame: 0,
		duration: FLAME10_DURATION,
		lastTime: 0,
		startX: sourceSlot.x,
		startY: sourceSlot.y,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityData,
		// Set texturePath based on format
		texturePath: abilityData.isGridFormat ? abilityData.path : `/abilities/${abilityFolder}/0000.png`,
		x: sourceSlot.x - 0.12,
		y: sourceSlot.y,
		scale: 1,
		draw: true,
		zIndex: 3,
		angle,
	};
}

// Create flame2 (impact) spell
export function createFlame2(targetSlot: SlotRenderData, abilityFolder: string): DrawSpell {
	const abilityData = abilityFolders.find(a => a.name === abilityFolder)!;

	return {
		currentFrame: 0,
		duration: FLAME2_DURATION,
		lastTime: 0,
		startX: targetSlot.x,
		startY: targetSlot.y,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityData,
		texturePath: abilityData.isGridFormat ? abilityData.path : `/abilities/${abilityFolder}/0000.png`,
		x: targetSlot.x,
		y: targetSlot.y,
		scale: 0.7,
		draw: true,
		zIndex: 2,
		angle: 0,
	};
}

// Waterball spell
export function createWater8(sourceSlot: SlotRenderData, targetSlot: SlotRenderData, abilityFolder: string): DrawSpell {
	const dx = targetSlot.x - sourceSlot.x;
	const dy = targetSlot.y - sourceSlot.y;
	const angle = Math.atan2(dy, dx);

	const abilityData = abilityFolders.find(a => a.name === abilityFolder)!;

	return {
		currentFrame: 0,
		duration: WATER10_DURATION,
		lastTime: 0,
		startX: sourceSlot.x,
		startY: sourceSlot.y,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityData,
		texturePath: abilityData.isGridFormat ? abilityData.path : `/abilities/${abilityFolder}/0000.png`,
		x: sourceSlot.x - 0.12,
		y: sourceSlot.y,
		scale: 0.5,
		draw: true,
		zIndex: 3,
		angle,
	};
}

export function createWater10(targetSlot: SlotRenderData, abilityFolder: string): DrawSpell {
	const abilityData = abilityFolders.find(a => a.name === abilityFolder)!;

	return {
		currentFrame: 0,
		duration: WATER2_DURATION,
		lastTime: 0,
		startX: targetSlot.x + 30,
		startY: targetSlot.y + 35,
		endX: targetSlot.x,
		endY: targetSlot.y,
		abilityFolder: abilityData,
		texturePath: abilityData.isGridFormat ? abilityData.path : `/abilities/${abilityFolder}/0000.png`,
		x: targetSlot.x + 30,
		y: targetSlot.y + 35,
		scale: 1.2,
		draw: true,
		zIndex: 2,
		angle: Math.PI / 2,
	};
}
