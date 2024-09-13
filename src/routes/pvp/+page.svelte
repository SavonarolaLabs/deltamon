<script lang="ts">
	import { base } from "$app/paths";
	import Navigation from "$lib/Navigation.svelte";
	import { game } from "$lib/pvp/game";
	import { endTurn, startMatch } from "$lib/pvp/gameloop";
	import SlotComponent from "$lib/SlotComponent.svelte";
	import { onMount, tick } from "svelte";
	import BattleCreaturePanel from "$lib/BattleCreaturePanel.svelte";
	import {
		click_mode,
		CLICK_MODE_ATTACK,
		selected_creature,
	} from "$lib/pvpuistate";
	import { attack } from "$lib/pvp/combat";
	import type { GameState } from "$lib/types";

	let logs: string[] = [];
	let logContainer: HTMLDivElement;

	function updateCursor() {
		document.body.style.cursor =
			$click_mode === CLICK_MODE_ATTACK
				? `url(${base}/cursor/sword.cur), auto`
				: "default";
	}

	function setTargetableCreatures(game: GameState): GameState {
		const activePlayer = game.activeCreature?.playerId;
		console.log("setTargetableCreatures: ");
		game.slots.forEach((slot) => {
			if (slot?.creature && slot.creature.playerId !== activePlayer) {
				slot.creature.isTargetCandidate = true;
			} else {
				slot.creature.isTargetCandidate = false;
			}
		});
		return game;
	}

	function unsetTargetableCreatures(game: GameState): GameState {
		game.slots.forEach((slot) => {
			if (slot?.creature) {
				slot.creature.isTargetCandidate = false;
			}
		});
		return game;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key.toLowerCase() === "a") {
			if ($click_mode == CLICK_MODE_ATTACK) {
				return;
			}
			click_mode.set(CLICK_MODE_ATTACK);
			setTargetableCreatures(game);
			game.slots = game.slots;
			updateCursor();
		} else if (event.key === "Escape") {
			if ($click_mode == CLICK_MODE_ATTACK) {
				unsetTargetableCreatures(game);
				game.slots = game.slots;
				click_mode.set(0);
			} else {
				selected_creature.set(null);
			}
			updateCursor();
		} else if (event.key === " ") {
			event.preventDefault();
			if (game.gameOver || !game.currentRound) {
				startMatch(game);
				logEvent("Match started.");
			} else {
				endTurn(game);
				logEvent("next turn");
			}
			game.slots = game.slots;
			game.activeCreature = game.activeCreature;
		} else if (event.key.toLowerCase() === "s") {
			game.currentRound = game.currentRound;
			game.activeCreature = game.activeCreature;
		}
	}

	function logEvent(event: string) {
		game.currentRound = game.currentRound;
		logs = [...logs, event];
		scrollToBottom();
	}

	async function scrollToBottom() {
		await tick();
		if (logContainer) {
			logContainer.scrollTop = logContainer.scrollHeight;
		}
	}

	onMount(() => {
		updateCursor();
		startMatch(game);
		game.slots = game.slots;
	});

	function handleChildUpdate(event: CustomEvent) {
		const msg = event.detail;
		if (msg?.action == "attack") {
			const sourceId = game.activeCreature?.bcId!;
			attack(game, sourceId, msg.targetId);
			click_mode.set(0);
			updateCursor();
			game.slots = game.slots;
			setTimeout(() => {
				endTurn(game);
				game.slots = game.slots;
			}, 800);
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
	class="h-full flex flex-col bg-arena"
	style="background-image:url('https://i.pinimg.com/originals/18/2a/a3/182aa350a17925b3b228fe9b760da4c7.jpg')"
>
	<div class="w-full fixed">
		<Navigation></Navigation>
	</div>

	<div class="h-full flex flex-col justify-center">
		<div
			class="fixed top-12 left-2 bg-black bg-opacity-70 text-white p-2 w-32 z-10 flex flex-col"
		>
			<p>Round: {game.currentRound}</p>
			<p>Game Over: {game.gameOver ? "Yes" : "No"}</p>
			{#if game.winner}
				<p>Winner: {game.winner.name}</p>
			{:else}
				<p>Winner: TBD</p>
			{/if}
		</div>
		<div class="mt-10">click_mode:{$click_mode}</div>

		<main
			class="flex justify-center items-center text-sm mt-8 justify-around"
		>
			<!-- Left side: 6 creatures -->
			<div class="flex flex-col gap-2">
				{#each [0, 2, 4] as rowStart}
					<div class="flex gap-2">
						<SlotComponent
							slot={game.slots[rowStart]}
							index={rowStart}
							isTopRow={true}
							on:childUpdate={handleChildUpdate}
						/>
						<SlotComponent
							slot={game.slots[rowStart + 1]}
							index={rowStart + 1}
							isTopRow={true}
							on:childUpdate={handleChildUpdate}
						/>
					</div>
				{/each}
			</div>

			<!-- Right side: 6 creatures -->
			<div class="flex flex-col gap-2">
				{#each [6, 8, 10] as rowStart}
					<div class="flex gap-2">
						<SlotComponent
							slot={game.slots[rowStart]}
							index={rowStart}
							isTopRow={true}
							on:childUpdate={handleChildUpdate}
						/>
						<SlotComponent
							slot={game.slots[rowStart + 1]}
							index={rowStart + 1}
							isTopRow={true}
							on:childUpdate={handleChildUpdate}
						/>
					</div>
				{/each}
			</div>
		</main>

		<!-- Game Log -->
		<div
			bind:this={logContainer}
			class="fixed bottom-0 w-full bg-black bg-opacity-80 text-white p-4 max-h-40 overflow-y-auto"
		>
			{#each logs as log}
				<p>{log}</p>
			{/each}
		</div>

		<!-- Hero Panel -->
		<BattleCreaturePanel />
	</div>
</div>

<style>
	.bg-arena {
		background-position: center;
		background-size: cover;
	}
</style>
