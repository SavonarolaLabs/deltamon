// src/lib/stores/dungeons.ts
import { writable } from "svelte/store";

export interface Monster {
	monster: number;
	prediction: string[];
}

export interface Dungeon {
	name: string;
	monsters: Monster[];
}

const initialDungeons: Dungeon[] = [
	{ name: "ALPH/USD", monsters: [] },
	{ name: "BTC/USD", monsters: [] },
	{ name: "ETH/USD", monsters: [] },
];

export const dungeons = writable(initialDungeons);

export function addMonsterToDungeon(dungeonName: string, monster: Monster) {
	dungeons.update((currentDungeons) => {
		const dungeon = currentDungeons.find((d) => d.name === dungeonName);
		if (dungeon) {
			dungeon.monsters.push(monster);
		}
		return currentDungeons;
	});
}
