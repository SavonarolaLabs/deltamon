import type { AbilityFunction, GameState, BattleCreatureId } from "$lib/types";
import { die } from "./combat";

export const attackFunction: AbilityFunction = (
	game,
	sourceId,
	targetIds,
	ability
) => {
	const source = game.slots.find((s) => s.creature?.bcId === sourceId)
		?.creature!;
	targetIds.forEach((targetId) => {
		const target = game.slots.find((s) => s.creature?.bcId === targetId)
			?.creature!;
		const attackDmg = Math.max(source.attack - target.defense, 0);
		target.hp = Math.max(0, target.hp - attackDmg);
		if (target.hp === 0) {
			die(game, targetId);
		}
	});
	return game;
};

export const fireballFunction: AbilityFunction = (
	game,
	sourceId,
	targetIds,
	ability
) => {
	const source = game.slots.find((s) => s.creature?.bcId === sourceId)
		?.creature!;
	if (source.mp < ability.manaCost) {
		return game;
	}
	source.mp -= ability.manaCost;

	targetIds.forEach((targetId) => {
		const target = game.slots.find((s) => s.creature?.bcId === targetId)
			?.creature!;
		const damage = Math.max(source.attack - target.defense + 10, 0);
		target.hp = Math.max(0, target.hp - damage);
		if (target.hp === 0) {
			die(game, targetId);
		}
	});
	return game;
};
