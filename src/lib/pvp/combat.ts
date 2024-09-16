import type { BattleCreature, BattleCreatureId, GameState } from "$lib/types";

export function attack(
	game: GameState,
	sourceId: BattleCreatureId,
	targetId: BattleCreatureId
): GameState {
	const source: BattleCreature = game.slots.find(
		(s) => s.creature?.bcId == sourceId
	)?.creature!;
	const target: BattleCreature = game.slots.find(
		(s) => s.creature?.bcId == targetId
	)?.creature!;
	const attackDmg = Math.max(source.attack - target.defense, 0);
	target.hp = Math.max(0, target.hp - attackDmg);
	if (target.hp == 0) {
		die(game, targetId);
	}
	return game;
}

// if creature dies but returns dmg and then the other dies, the last one to die wins
export function die(game: GameState, creatureId: BattleCreatureId): GameState {
	game.slots.forEach((slot) => {
		if (slot.creature?.bcId == creatureId) {
			slot.creature = null;
		}
	});
	return game;
}
