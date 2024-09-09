export type Creature = {
	id: number;
	name: string;
	img: string;
	maxHp: number;
	attack: number;
	defense: number;
	initiative: number;
	skills: CretureSkill[];
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
	playerId: number;
	canActThisRound: boolean;
	isActive: boolean;
	isSelected: boolean;
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
