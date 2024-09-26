import type { DamageType } from '$lib/pvp/constants';

export type Creature = {
	id: number;
	name: string;
	img: string;
	maxHp: number;
	maxMp: number;
	attack: number;
	defense: number;
	initiative: number;
	abilities: Ability[];
	dmgAmplifier: Record<DamageType, number>;
	dmgResistance: Record<DamageType, number>;
};

export type CretureSkill = {
	name: '';
};

export type Slot = {
	creature: BattleCreature | null;
};

export type BattleCreature = Creature & {
	bcId: BattleCreatureId;
	hp: number;
	mp: number;
	playerId: number;
	canActThisRound: boolean;
	isActive: boolean;
	isSelected: boolean;
	isTargetCandidate: boolean;
	isHoveredTarget: boolean;
};

export type PlayerId = number;
export type BattleCreatureId = string;

export type Player = {
	id: number;
	name: string;
};

export type GameState = {
	players: Player[];
	slots: Slot[];
	currentRound: number;
	activeCreature: BattleCreature | null;
	gameOver: boolean;
	winner: Player | null;
};

export type Ability = {
	name: string;
	description: string;
	icon: string;
	manaCost: number;
	damage?: DamageInstance[];
	action: AbilityFunction;
};

export type AbilityFunction = (
	game: GameState,
	sourceId: BattleCreatureId,
	targetIds: BattleCreatureId[],
	ability: Ability
) => GameState;

export type Damage = {
	amount: number;
	type: DamageType;
};

export type DamageInstance = {
	parts: Damage[];
};

// rendering
export type AbilityFolder = {
	name: string;
	path: string;
	frameCount: number;
};

export type DrawSpell = {
	// animate
	currentFrame: number;
	duration: number;
	startTime: number;
	lastTime: number;
	startX: number;
	startY: number;
	endX: number;

	// render
	abilityFolder: AbilityFolder;
	texturePath: string;
	x: number;
	y: number;
	z: number;
	scale: number;
	draw: boolean;
};
