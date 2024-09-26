import { abilityFolders } from './abilityFolders';
import type { DrawSpell } from '$lib/types';

export function createFlame10(): DrawSpell {
	return {
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
}

export function createFlame2(flame10: DrawSpell): DrawSpell {
	return {
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
}
