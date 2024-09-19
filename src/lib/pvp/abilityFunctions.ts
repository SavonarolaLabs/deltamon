import type {
	AbilityFunction,
	GameState,
	BattleCreatureId,
	DamageInstance,
} from "$lib/types";
import { die } from "./combat";
import { PHYSICAL } from "./constants";

const findCreature = (game: GameState, bcId: BattleCreatureId) => {
	return game.slots.find((slot) => slot.creature?.bcId === bcId)?.creature!;
};

const applyAmplificationAndResistance = (
	sourceAmplifier: number,
	targetResistance: number,
	baseDamage: number
) => {
	return baseDamage * sourceAmplifier * targetResistance;
};

const inflictDamage = (
	game: GameState,
	sourceId: BattleCreatureId,
	targetId: BattleCreatureId,
	damageInstance: DamageInstance
) => {
	const source = findCreature(game, sourceId);
	const target = findCreature(game, targetId);
	if (!target || target.hp === 0) return;

	damageInstance.parts.forEach((damage) => {
		if (target.hp === 0) return;

		const sourceAmplifier = source.dmgAmplifier[damage.type] || 1;
		const targetResistance = target.dmgResistance[damage.type] || 1;
		const amplifiedDamage = applyAmplificationAndResistance(
			sourceAmplifier,
			targetResistance,
			damage.amount
		);

		target.hp = Math.max(0, target.hp - amplifiedDamage);

		if (target.hp === 0) {
			die(game, targetId);
			return;
		}
	});
};

export const attackFunction: AbilityFunction = (
	game,
	sourceId,
	targetIds,
	ability
) => {
	const source = findCreature(game, sourceId);

	targetIds.forEach((targetId) => {
		const physicalDamageInstance: DamageInstance = {
			parts: [{ amount: source.attack, type: PHYSICAL }],
		};
		inflictDamage(game, sourceId, targetId, physicalDamageInstance);
	});

	return game;
};

export const fireballFunction: AbilityFunction = (
	game,
	sourceId,
	targetIds,
	ability
) => {
	const source = findCreature(game, sourceId);

	if (source.mp < ability.manaCost) {
		return game;
	}
	source.mp -= ability.manaCost;

	targetIds.forEach((targetId) => {
		ability.damage?.forEach((damageInstance) => {
			inflictDamage(game, sourceId, targetId, damageInstance);
		});
	});

	return game;
};
