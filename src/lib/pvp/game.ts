import type { BattleCreature, Creature, GameState } from "$lib/types";
import { creatures } from "./creatures";

export const P1 = 1;
export const P2 = 2;

function toBattleCreature(
	playerId: number,
	creature: Creature
): BattleCreature {
	const c: BattleCreature = {
		bcId: crypto.randomUUID(),
		...creature,
		hp: creature.maxHp,
		mp: creature.maxMp,
		playerId,
		canActThisRound: false,
		isActive: false,
		isSelected: false,
		isTargetCandidate: false,
		isHoveredTarget: false,
	};
	return c;
}

export const game: GameState = {
	players: [
		{ id: 1, name: "Player 1" },
		{ id: 2, name: "Player 2" },
	],
	// slots: [
	// 	{ creature: toBattleCreature(1, creatures[11]) },
	// 	{ creature: toBattleCreature(1, creatures[10]) },
	// 	{ creature: toBattleCreature(1, creatures[25]) },
	// 	{ creature: toBattleCreature(1, creatures[21]) },
	// 	{ creature: toBattleCreature(1, creatures[143]) },
	// 	{ creature: toBattleCreature(1, creatures[52]) },

	// 	{ creature: toBattleCreature(2, creatures[7]) },
	// 	{ creature: toBattleCreature(2, creatures[18]) },
	// 	{ creature: toBattleCreature(2, creatures[33]) },
	// 	{ creature: toBattleCreature(2, creatures[5]) },
	// 	{ creature: toBattleCreature(2, creatures[31]) },
	// 	{ creature: toBattleCreature(2, creatures[3]) },
	// ],
	slots: [
		{ creature: null },
		{ creature: null },
		{ creature: toBattleCreature(1, creatures[13]) },
		{ creature: toBattleCreature(1, creatures[25]) },
		{ creature: null },
		{ creature: null },

		{ creature: null },
		{ creature: null },
		{ creature: toBattleCreature(2, creatures[121]) },
		{ creature: toBattleCreature(2, creatures[151]) },
		{ creature: null },
		{ creature: null },
	],
	currentRound: 0,
	gameOver: false,
	winner: null,
	activeCreature: null,
};
