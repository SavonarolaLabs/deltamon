import type { BattleCreature } from "$lib/types";
import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const selected_creature: Writable<BattleCreature | null> =
	writable(null);

export const CLICK_MODE_ATTACK = 1;
export const click_mode: Writable<number> = writable(0);
