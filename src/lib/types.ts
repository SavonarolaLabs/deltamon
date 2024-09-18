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
};

export type CretureSkill = {
	name: "";
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
	abilityType: "physical" | "magical";
	action: AbilityFunction;
};

export type AbilityFunction = (
	game: GameState,
	sourceId: BattleCreatureId,
	targetIds: BattleCreatureId[],
	ability: Ability
) => GameState;
