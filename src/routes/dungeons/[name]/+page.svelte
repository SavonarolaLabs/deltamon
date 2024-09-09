<script lang="ts">
	import { page } from "$app/stores";
	import Navigation from "$lib/Navigation.svelte";
	import { dungeons } from "$lib/stores/dungeons";
	import Tri from "$lib/Tri.svelte";

	$: dungeonName = $page.params.name.replace("_", "/");
	$: currentDungeon = $dungeons.find((d) => d.name === dungeonName);
</script>

<Navigation />

<div class="p-2">
	<h1 class="text-2xl">{dungeonName} Dungeon</h1>

	{#if currentDungeon}
		<div class="mt-4">
			<h2 class="text-xl">Monsters in this dungeon:</h2>
			{#if currentDungeon.monsters.length > 0}
				{#each currentDungeon.monsters as monster, index}
					<div class="mt-2 p-2 border border-yellow-500 rounded">
						<p>Monster #{index + 1}</p>
						<div class="flex gap-2">
							{#each monster.prediction as direction}
								<Tri {direction} />
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<p>No monsters in this dungeon yet.</p>
			{/if}
		</div>
	{:else}
		<p>Dungeon not found.</p>
	{/if}
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
</style>
