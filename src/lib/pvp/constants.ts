// damageTypes.ts
export const PHYSICAL = 1;
export const PURE = 2;
export const ICE = 3;
export const FIRE = 4;

export type DamageType =
	| typeof PHYSICAL
	| typeof PURE
	| typeof ICE
	| typeof FIRE;
