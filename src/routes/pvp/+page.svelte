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

	let logs: string[] = [];
	let logContainer: HTMLDivElement;

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key.toLowerCase() === "a") {
			click_mode.set(CLICK_MODE_ATTACK);
		} else if (event.key === "Escape") {
			if ($click_mode == CLICK_MODE_ATTACK) {
				click_mode.set(0);
			} else {
				selected_creature.set(null);
			}
		} else if (event.key === " ") {
			event.preventDefault(); // Prevent scrolling when space is pressed
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

	// Scrolls the log container to the bottom
	async function scrollToBottom() {
		await tick(); // Wait for DOM updates
		if (logContainer) {
			logContainer.scrollTop = logContainer.scrollHeight;
		}
	}

	let cursorStyle = "default";

	$: {
		if ($click_mode === CLICK_MODE_ATTACK) {
			cursorStyle = `url(${base}/cursor/sword.cur), auto`;
		} else {
			cursorStyle = "default";
		}
	}

	onMount(() => {
		document.body.style.cursor = cursorStyle;
	});

	function handleChildUpdate(event: CustomEvent) {
		const msg = event.detail;
		if (msg?.action == "attack") {
			const sourceId = game.activeCreature?.bcId!;
			attack(game, sourceId, msg.targetId);
			click_mode.set(0);
			endTurn(game);
			game.slots = game.slots;
		}
	}
</script>

<Navigation></Navigation>
<svelte:window
	on:keydown={handleKeyDown}
	on:mousemove={() => {
		document.body.style.cursor = cursorStyle;
	}}
/>

<div class="flex flex-col">
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

	<main class="flex flex-col justify-center items-center text-sm">
		<!-- Game slots -->
		<div class="flex items-end gap-4 mt-8">
			{#each game.slots.slice(0, 4) as slot, index}
				<SlotComponent
					{slot}
					{index}
					isTopRow={true}
					on:childUpdate={handleChildUpdate}
				/>
			{/each}
		</div>

		<div class="flex items-start gap-4 mt-14">
			{#each game.slots.slice(4, 8) as slot, index}
				<SlotComponent
					{slot}
					{index}
					isTopRow={false}
					on:childUpdate={handleChildUpdate}
				/>
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
