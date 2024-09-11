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

<div class:float-animation={slot.creature?.isActive}>
	<div
		class="creature-slot border-gray-300 border border-slate-400 rounded-md bg-white"
		class:cursor-pointer={!$click_mode}
		class:cursor-not-allowed={$click_mode == CLICK_MODE_ATTACK &&
			slot.creature?.playerId == game.activeCreature?.playerId}
		class:selected={slot.creature?.isSelected}
		class:active={slot.creature?.isActive}
		on:click={handleClick}
	>
		<div class="content">
			{#if slot.creature}
				<img
					class="block mx-auto"
					src={base + "/monster/" + slot.creature.img}
					alt={slot.creature.name}
					width="190"
				/>

				<p class="text-center">
					{#if slot.creature.canActThisRound}●{/if} HP {slot.creature
						.hp}/{slot.creature.maxHp}
				</p>
			{:else}
				<p class="text-center">No creature in this slot</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.creature-slot {
		transition: transform 0.15s ease;
		transform: scale(1);
		transform-origin: center;
		width: 100%; /* Ensure full width */
	}

	.creature-slot.active {
		transform: scale(1.05);
	}

	.content {
		padding-top: 1rem;
		padding-bottom: 1rem;
		height: 100%; /* Ensure full height */
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.float-animation {
		animation: float 3s ease-in-out infinite;
	}

	.selected {
		border: 2px solid gold;
		background-color: rgba(255, 215, 0, 0.2);
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-5px);
		}
	}
</style>
