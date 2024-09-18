import { attackFunction, fireballFunction } from "./abilityFunctions";
import type { Ability } from "$lib/types";

export const attackAbility: Ability = {
	name: "Attack",
	description: "A basic physical attack.",
	icon: "attack-icon.png",
	manaCost: 0,
	abilityType: "physical",
	action: attackFunction,
};

export const fireballAbility: Ability = {
	name: "Fireball",
	description: "Deals fire damage to the target.",
	icon: "fireball-icon.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const abilities = [attackAbility, fireballAbility];
