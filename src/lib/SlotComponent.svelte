<script lang="ts">
	import { base } from "$app/paths";
	import type { Slot } from "./types";
	import { game } from "$lib/pvp/game";
	import {
		click_mode,
		CLICK_MODE_ATTACK,
		selected_creature,
	} from "./pvpuistate";
	import { createEventDispatcher } from "svelte";

	export let slot: Slot;
	export let index: number;
	export let isTopRow: boolean;

	function handleClick() {
		// attack click
		if (
			$click_mode == CLICK_MODE_ATTACK &&
			slot.creature &&
			slot.creature?.playerId != game.activeCreature?.playerId
		) {
			notifyParent({
				action: "attack",
				targetId: slot.creature.bcId,
			});
			return;
		}

		if (slot.creature && !slot.creature.isSelected) {
			// Toggle selection for the clicked creature
			selected_creature.set(slot.creature);

			game.slots.forEach((s) => {
				if (s.creature && s !== slot) {
					s.creature.isSelected = false;
				}
			});
		}
	}

	const dispatch = createEventDispatcher();
	function notifyParent(action: any) {
		dispatch("childUpdate", action); // notify parent with the updated value
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="border-gray-300 py-4 text-center border border-slate-400 rounded-md bg-white"
	class:cursor-pointer={!$click_mode}
	class:cursor-not-allowed={$click_mode == CLICK_MODE_ATTACK &&
		slot.creature?.playerId == game.activeCreature?.playerId}
	class:selected={slot.creature?.isSelected}
	on:click={handleClick}
>
	{#if slot.creature}
		<img
			class="block"
			src={base + "/monster/" + slot.creature.img}
			alt={slot.creature.name}
			width="190"
		/>
		<div class="w-full px-10">
			{#if slot.creature.isActive}
				<div class="border border-black"></div>
			{/if}
		</div>

		<p>
			{#if slot.creature.canActThisRound}●{/if} HP {slot.creature
				.hp}/{slot.creature.maxHp}
		</p>
		<!-- <div class="w-full flex justify-between px-10">
			<p>A {slot.creature.attack}</p>
			<p>D {slot.creature.defense}</p>
			<p>I {slot.creature.initiative}</p>
		</div> -->
	{:else}
		<p>No creature in this slot</p>
	{/if}
</div>

<style>
	.selected {
		border: 2px solid gold;
		background-color: rgba(255, 215, 0, 0.2);
	}
</style>
