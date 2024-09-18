import type { BattleCreatureId, GameState, Ability } from "$lib/types";

export function useAbility(
	game: GameState,
	sourceId: BattleCreatureId,
	targetIds: BattleCreatureId[],
	ability: Ability
) {
	return ability.action(game, sourceId, targetIds, ability);
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
