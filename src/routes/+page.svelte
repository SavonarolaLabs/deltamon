<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import Navigation from "$lib/Navigation.svelte";
	import Tri from "$lib/Tri.svelte";
	import { dungeons, addMonsterToDungeon } from "$lib/stores/dungeons";

	let selectedDungeon = "ALPH/USD";
	let prediction = ["up", "up", "down", "down"];

	function selectDungeon(dungeon: string) {
		selectedDungeon = dungeon;
	}

	function sendToDungeon() {
		addMonsterToDungeon(selectedDungeon, {
			monster: 1,
			prediction: [...prediction],
		});
		console.log(`Sent to dungeon: ${selectedDungeon}`);
		console.log(`Prediction: ${prediction}`);
	}

	function togglePrediction(index: number) {
		prediction[index] = prediction[index] === "up" ? "down" : "up";
		prediction = [...prediction];
	}
</script>

<div class="main h-full" style="background-image: url({base}/bg.png);">
	<Navigation />
	<div class="h-full w-full flex flex-col items-center justify-center gap-6">
		<!-- Display the number of monsters in each dungeon -->
		<div class="dungeons fixed left-2 top-16">
			<div class="flex flex-col gap-4">
				{#each $dungeons as dungeon}
					<button
						class="dungeon-btn"
						on:click={() =>
							goto(
								`${base}/dungeons/${dungeon.name.replace("/", "_")}`
							)}
					>
						{dungeon.name} dungeon <br />{dungeon.monsters.length}x
						monster
					</button>
				{/each}
			</div>
		</div>
		<div
			class="text-2xl yellow-font flex flex-col gap-6"
			style="width:270px"
		>
			<div>
				<div>1. select monster</div>
				<img src="{base}/monster/1_1.jpg" alt="" class="w-full" />
			</div>
			<div>
				<div>2. select dungeon</div>
				<div class="flex gap-4 justify-center">
					<button
						class="dungeon-btn"
						class:selected={selectedDungeon === "ALPH/USD"}
						on:click={() => selectDungeon("ALPH/USD")}
					>
						ALPH
					</button>
					<button
						class="dungeon-btn"
						class:selected={selectedDungeon === "BTC/USD"}
						on:click={() => selectDungeon("BTC/USD")}
					>
						BTC
					</button>
					<button
						class="dungeon-btn"
						class:selected={selectedDungeon === "ETH/USD"}
						on:click={() => selectDungeon("ETH/USD")}
					>
						ETH
					</button>
				</div>
			</div>
			<div class="w-full flex flex-col">
				<div>3. Predict price swings</div>
				<div class="mt-2 flex gap-6 self-center">
					{#each prediction as direction, index}
						<button on:click={() => togglePrediction(index)}>
							<Tri {direction} />
						</button>
					{/each}
				</div>
			</div>
			<button
				class="cursor-pointer grow shadow-md pt-4 cursor-pointer mint font-bold p-2 rounded-md px-4"
				on:click={sendToDungeon}>Send to Dungeon</button
			>
		</div>
	</div>
</div>

<style>
	.yellow-font {
		color: yellow;
		font-family: "Luckiest Guy";
		text-shadow:
			-1px -1px 0 black,
			1px -1px 0 black,
			-1px 1px 0 black,
			1px 1px 0 black;
	}
	.mint {
		background: #232b6d85;
		color: yellow;
		border: 1px solid rgb(194, 194, 0);
		font-family: "Luckiest Guy";
	}
	.grow {
		transition: all 0.2s ease-in-out;
	}
	.grow:hover {
		transform: scale(1.05);
	}
	.main {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.dungeon-btn {
		background-color: #232b6d;
		color: yellow;
		border: 1px solid rgb(194, 194, 0);
		padding: 0.5rem 1rem;
		font-family: "Luckiest Guy";
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.2s;
	}

	.dungeon-btn:hover {
		background-color: #3a4a8f;
	}

	.dungeon-btn.selected {
		background-color: #ffcc00;
		color: black;
	}
</style>
