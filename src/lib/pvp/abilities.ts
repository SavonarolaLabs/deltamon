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

// fire
export const fireballAbility: Ability = {
	name: "Fireball",
	description: "Deals fire damage to the target.",
	icon: "fireball-red-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const enchantAbility: Ability = {
	name: "Enchant",
	description: "Deals fire damage to the target.",
	icon: "enchant-red-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const evilEyeAbility: Ability = {
	name: "Evil Eye",
	description: "Deals fire damage to the target.",
	icon: "evil-eye-red-1.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const redBeamAbility: Ability = {
	name: "Red Beam",
	description: "Deals fire damage to the target.",
	icon: "beam-red-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

//ice
export const iceMissleAbility: Ability = {
	name: "Ice Missle",
	description: "Deals fire damage to the target.",
	icon: "ice-blue-1.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const hasteAbility: Ability = {
	name: "Haste",
	description: "Deals fire damage to the target.",
	icon: "haste-sky-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const explosionAbility: Ability = {
	name: "Explosion",
	description: "Deals fire damage to the target.",
	icon: "explosion-sky-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const IceNovaAbility: Ability = {
	name: "RedBeam",
	description: "Deals fire damage to the target.",
	icon: "needles-blue-3.png",
	manaCost: 10,
	abilityType: "magical",
	action: fireballFunction,
};

export const abilities = [attackAbility, fireballAbility];
