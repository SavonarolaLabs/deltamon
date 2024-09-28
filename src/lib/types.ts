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

export type AbilityFunction = (game: GameState, sourceId: BattleCreatureId, targetIds: BattleCreatureId[], ability: Ability) => GameState;

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
	isGridFormat?: boolean; // New property indicating if the ability uses a grid format
	gridRows?: number; // Number of rows in the grid
	gridCols?: number; // Number of columns in the grid
};

export type SlotRenderData = {
	slotIndex: number;
	playerId: number;
	texturePath: string;
	originalX: number;
	originalY: number;
	x: number;
	y: number;
	scale: number;
	zIndex: number;
	isHovered: boolean;
	whiteFlash?: number;
	angle?: number;
	currentFrame: number; // Added to align with DrawSpell
};

export type DrawSpell = {
	currentFrame: number;
	duration: number;
	startTime?: number;
	lastTime: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;

	abilityFolder: AbilityFolder;
	texturePath: string;
	x: number;
	y: number;
	scale: number;
	zIndex: number;
	draw: boolean;
	whiteFlash?: number;
	angle?: number;
};

export type TextureMetadata = {
	texture: WebGLTexture;
	width: number;
	height: number;
	aspectRatio: number;
	isGridFormat?: boolean; // New property for texture metadata
	gridRows?: number; // Number of rows in the grid
	gridCols?: number; // Number of columns in the grid
};
export type TextureMetadataMap = { [key: string]: TextureMetadata };

export interface ImpactAnimation {
	targetSlotIndex: number;
	startTime: number;
}

export interface JumpAnimation {
	slotIndex: number;
	targetSlotIndex: number;
	startTime: number;
	duration: number;
	startX: number;
	startY: number;
	targetX: number;
	targetY: number;
	jumpHeight: number;
	phase: 'jump' | 'return';
}
