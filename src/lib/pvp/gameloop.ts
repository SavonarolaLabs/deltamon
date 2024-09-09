import type { GameState, PlayerId } from "$lib/types";
import { P1, P2 } from "./game";

export function startMatch(game: GameState): GameState {
	startRound(game);
	return game;
}

function startTurn(game: GameState): GameState {
	nextActiveCreature(game);
	return game;
}

export function endTurn(game: GameState): GameState {
	endCurrentCeaturesAction(game);
	if (game.slots.filter((s) => s.creature?.canActThisRound).length) {
		startTurn(game);
	} else {
		endRound(game);
	}
	return game;
}

function startRound(game: GameState): GameState {
	game.currentRound++;
	game.slots
		.filter((s) => s.creature)
		.forEach((c) => (c.creature!.canActThisRound = true));
	startTurn(game);
	return game;
}

function endRound(game: GameState): GameState {
	if (hasCreatures(game, P1) && hasCreatures(game, P2)) {
		startRound(game);
	}
	if (!hasCreatures(game, P1)) {
		endMatch(game, P2);
	} else if (!hasCreatures(game, P2)) {
		endMatch(game, P1);
	}
	return game;
}

function hasCreatures(game: GameState, playerId: PlayerId): boolean {
	return game.slots.some((s) => s.creature?.playerId == playerId);
}

function endMatch(game: GameState, winner: PlayerId): GameState {
	game.winner = game.players[winner - 1];
	game.gameOver = true;
	return game;
}

function endCurrentCeaturesAction(game: GameState): GameState {
	if (game.activeCreature) {
		game.activeCreature.isActive = false;
		game.activeCreature.canActThisRound = false;
	}
	return game;
}

function nextActiveCreature(game: GameState): GameState {
	game.activeCreature =
		game.slots
			.filter((s) => s.creature?.canActThisRound)
			.map((s) => s.creature!)
			.sort((a, b) => a.initiative - b.initiative)[0] || null;
	game.activeCreature.isActive = true;
	return game;
}
