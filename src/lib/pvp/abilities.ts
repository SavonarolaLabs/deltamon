import { attackFunction, fireballFunction } from "./abilityFunctions";
import { PHYSICAL, FIRE, ICE } from "./constants"; // Import the constants
import type { Ability } from "$lib/types";

export const attackAbility: Ability = {
	name: "Attack",
	description: "A basic physical attack dealing moderate damage.",
	icon: "attack-icon.png",
	manaCost: 0,
	action: attackFunction,
};

export const fireballAbility: Ability = {
	name: "Fireball",
	description: "Launches a fireball dealing fiery destruction.",
	icon: "fireball-red-3.png",
	manaCost: 10,
	action: fireballFunction,
	damage: [{ parts: [{ amount: 30, type: FIRE }] }],
};

export const enchantAbility: Ability = {
	name: "Enchant",
	description: "Empowers the target, boosting their abilities.",
	icon: "enchant-red-3.png",
	manaCost: 5,
	action: fireballFunction,
};

export const evilEyeAbility: Ability = {
	name: "Evil Eye",
	description: "Glares at the target, weakening them.",
	icon: "evil-eye-red-1.png",
	manaCost: 8,
	action: fireballFunction,
};

export const redBeamAbility: Ability = {
	name: "Red Beam",
	description: "Shoots a beam of red energy, searing the target.",
	icon: "beam-red-3.png",
	manaCost: 12,
	action: fireballFunction,
	damage: [{ parts: [{ amount: 25, type: FIRE }] }],
};

export const iceMissleAbility: Ability = {
	name: "Ice Missile",
	description: "Fires a shard of ice that chills the enemy.",
	icon: "ice-blue-2.png",
	manaCost: 10,
	action: fireballFunction,
	damage: [{ parts: [{ amount: 20, type: ICE }] }],
};

export const hasteAbility: Ability = {
	name: "Haste",
	description: "Increases the target's speed for a short duration.",
	icon: "haste-sky-3.png",
	manaCost: 5,
	action: fireballFunction,
};

export const explosionAbility: Ability = {
	name: "Explosion",
	description:
		"Triggers an explosion that deals massive fire damage in an area.",
	icon: "explosion-sky-3.png",
	manaCost: 15,
	action: fireballFunction,
	damage: [{ parts: [{ amount: 40, type: FIRE }] }],
};

export const iceNovaAbility: Ability = {
	name: "Ice Nova",
	description: "Unleashes a freezing nova, damaging all nearby enemies.",
	icon: "needles-blue-3.png",
	manaCost: 12,
	action: fireballFunction,
	damage: [{ parts: [{ amount: 25, type: ICE }] }],
};

export const abilities = [
	attackAbility,
	fireballAbility,
	enchantAbility,
	evilEyeAbility,
	redBeamAbility,
	iceMissleAbility,
	hasteAbility,
	explosionAbility,
	iceNovaAbility,
];
