<script lang="ts">
	import { selected_creature } from "./pvpuistate";
</script>

{#if $selected_creature}
	<div class="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
		<div class="flex justify-between items-start">
			<div>
				<h2 class="text-xl font-bold">{$selected_creature.name}</h2>
				<p>HP: {$selected_creature.hp}/{$selected_creature.maxHp}</p>
				<div class="flex space-x-4">
					<p>Attack: {$selected_creature.attack}</p>
					<p>Defense: {$selected_creature.defense}</p>
					<p>Initiative: {$selected_creature.initiative}</p>
				</div>
			</div>
			<div class="flex space-x-2">
				{#each $selected_creature.skills || [] as skill}
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						{skill.name}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
