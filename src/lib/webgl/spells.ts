import { abilityFolders } from './abilityFolders';
import type { DrawSpell } from '$lib/types';

const FLAME10_DURATION = 450; // Duration in ms for flame10
const FLAME2_DURATION = 200; // Duration in ms for flame2

export function createFlame10(): DrawSpell {
	return {
		currentFrame: 0,
		duration: FLAME10_DURATION, // Use duration for interpolation
		lastTime: 0,
		startX: -0.45,
		startY: 0.7,
		endX: 0.35,
		abilityFolder: abilityFolders.find(a => a.name == 'flame10')!,
		texturePath: `/abilities/flame10/0000.png`,
		x: -0.45,
		y: 0.7,
		scale: 0.5,
		draw: true,
		z: 1,
	};
}

export function createFlame2(flame10: DrawSpell): DrawSpell {
	return {
		currentFrame: 0,
		duration: FLAME2_DURATION, // Use duration for static display of frames
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
}
