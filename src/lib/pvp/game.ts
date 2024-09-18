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
	slots: [
		{ creature: null },
		{ creature: null },
		//{ creature: toBattleCreature(1, creatures[13]) },
		{ creature: null },
		{ creature: toBattleCreature(1, creatures[10 - 1]) },
		{ creature: null },
		{ creature: null },

		{ creature: null },
		{ creature: null },
		{ creature: toBattleCreature(2, creatures[22]) },
		//{ creature: toBattleCreature(2, creatures[121]) },
		{ creature: null },
		{ creature: null },
		{ creature: null },
	],
	currentRound: 0,
	gameOver: false,
	winner: null,
	activeCreature: null,
};
