<script lang="ts">
	import { base } from '$app/paths';
	import type { Slot } from './types';
	import { game } from '$lib/pvp/game';
	import { click_mode, CLICK_MODE_ATTACK, selected_creature } from './pvpuistate';
	import { createEventDispatcher, onMount } from 'svelte';
	import DmgNumber from './DmgNumber.svelte';
	import { writable } from 'svelte/store';

	export let slot: Slot;
	export let index: number;
	export let isTopRow: boolean;

	let prevHp = slot.creature?.hp ?? 0;
	let showDamage = writable(false);
	let damageValue = writable(0);
	let isHit = writable(false);

	let dmgPositionX = writable(0);
	let dmgPositionY = writable(0);

	onMount(() => {
		prevHp = slot.creature?.hp ?? 0;
	});

	$: if (slot.creature?.hp !== prevHp) {
		const damageDiff = prevHp - (slot.creature?.hp ?? 0);
		if (damageDiff !== 0) {
			damageValue.set(Math.abs(damageDiff));
			showDamage.set(true);
			isHit.set(true);

			dmgPositionX.set((Math.random() - 0.5) * 40);
			dmgPositionY.set((Math.random() - 0.5) * 40);

			setTimeout(() => {
				isHit.set(false);
			}, 200);

			setTimeout(() => {
				showDamage.set(false);
			}, 1000);
		}
		prevHp = slot.creature?.hp ?? 0;
	}

	function handleClick() {
		if (
			$click_mode == CLICK_MODE_ATTACK &&
			slot.creature &&
			slot.creature?.playerId != game.activeCreature?.playerId
		) {
			slot.creature.isHoveredTarget = false;
			notifyParent({
				action: 'attack',
				targetId: slot.creature.bcId,
			});
			return;
		}

		if (slot.creature && !slot.creature.isSelected) {
			selected_creature.set(slot.creature);

			game.slots.forEach(s => {
				if (s.creature && s !== slot) {
					s.creature.isSelected = false;
				}
			});
		}
	}

	const dispatch = createEventDispatcher();
	function notifyParent(action: any) {
		dispatch('childUpdate', action);
	}

	function handleMouseEnter() {
		if (slot.creature && $click_mode != 0 && slot.creature?.isTargetCandidate) {
			slot.creature.isHoveredTarget = true;
		}
	}

	function handleMouseLeave() {
		if (slot.creature) {
			slot.creature.isHoveredTarget = false;
		}
	}

	$: isLeftSide = index < 6;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class:float-animation={slot.creature?.isActive}
	style={slot.creature?.isActive ? 'z-index:100;' : 'z-index:10'}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="creature-slot border-gray-300 border border-slate-400 rounded-md"
		class:cursor-pointer={!$click_mode && slot.creature}
		class:cursor-not-allowed={$click_mode == CLICK_MODE_ATTACK &&
			slot.creature?.playerId == game.activeCreature?.playerId}
		class:selected={slot.creature?.isSelected}
		class:active={slot.creature?.isActive}
		class:hit={$isHit}
		class:hit-left={$isHit && isLeftSide}
		class:hit-right={$isHit && !isLeftSide}
		class:hovered-target={slot.creature?.isHoveredTarget}
		class:empty-slot={!slot.creature}
		on:click={handleClick}
	>
		<div class="red-flash-layer"></div>
		{#if slot.creature && $click_mode != 0 && !slot.creature?.isTargetCandidate && !slot.creature?.isActive}
			<div class="not-targetable-layer"></div>
		{/if}
		<div class="content">
			{#if $showDamage}
				<div
					class="dmg-number-wrapper"
					style="transform: translate({$dmgPositionX}px, {$dmgPositionY}px);"
				>
					<DmgNumber damage={$damageValue} />
				</div>
			{/if}

			{#if slot.creature}
				<img
					class="block mx-auto"
					src={base + '/monster/' + slot.creature.img}
					alt={slot.creature.name}
					width="190"
				/>
				<div class="flex justify-center gap-1">
					<div style="font-size:8px;font-weight:bold">HP</div>
					<div class="hp-bar-wrapper self-center">
						<div
							class="hp-bar"
							style="width: {(slot.creature.hp / slot.creature.maxHp) * 100}%;"
						></div>
					</div>
				</div>
			{:else}
				<div
					class="logo text-green-200 text-white text-xl h-full flex flex-col justify-center items-center"
				>
					<div class="flex items-center">DELTAMON</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.logo {
		font-family: 'Luckiest Guy', cursive;
	}
	.empty-slot {
		opacity: 0.9;
		background-color: rgba(0, 0, 0, 0.583);
	}
	.creature-slot {
		width: 188px; /* Updated from 190px */
		height: 266px; /* Updated from 234px */
		position: relative;
		overflow: hidden;
		transition: transform 0.15s ease;
	}

	.creature-slot.hovered-target {
		border: 4px solid rgba(203, 0, 0, 0.832);
	}

	.red-flash-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: red;
		opacity: 0;
		pointer-events: none;
		z-index: 10;
		transition: opacity 0.1s ease-out;
	}

	.not-targetable-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		pointer-events: none;
		z-index: 10;
	}

	.creature-slot.hit .red-flash-layer {
		opacity: 0.4;
	}

	.creature-slot.active {
		transform: scale(1.15);
		z-index: 1000;
		box-shadow: 0 5px 5px rgba(0, 0, 0, 0.7);
	}

	.creature-slot.selected {
		transform: scale(1.05);
	}

	.creature-slot.hit-left {
		animation: hit-left 0.2s ease-out;
	}

	.creature-slot.hit-right {
		animation: hit-right 0.2s ease-out;
	}

	@keyframes hit-left {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-10px);
		}
	}

	@keyframes hit-right {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(10px);
		}
	}

	.content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.float-animation {
		animation: float 2.4s ease-in-out infinite;
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
			transform: translateY(-6px);
		}
	}

	.hp-bar-wrapper {
		width: 80%;
		height: 4px;
		background-color: #e0e0e0;
		border-radius: 2px;
		overflow: hidden;
	}

	.hp-bar {
		height: 100%;
		background-color: #30794b;
		transition: width 0.4s ease-in;
	}

	.dmg-number-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
