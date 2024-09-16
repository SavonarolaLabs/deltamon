<script lang="ts">
	import { base } from "$app/paths";
	import { selected_creature } from "./pvpuistate";
</script>

{#if $selected_creature}
	<div
		class=" bg-gray-800 text-white p-4 z-50 w-[fit-content] fixed bottom-0 left-1/2 -translate-x-1/2"
		style="z-index:2000"
	>
		<!-- <div class="flex justify-between items-start">
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
		</div> -->
		<div class="flex-flex-col">
			<!-- Name + Buffs+Debuffs -->
			<div class="flex items-end">
				{$selected_creature.bcId}
			</div>
			<div class="flex gap-4">
				<!-- Avatar -->
				<div>
					<img
						style="width:130px;"
						src="{base}/monster/{$selected_creature.img}"
						alt=""
					/>
				</div>
				<!-- Skills + Bars -->
				<div class="flex flex-col gap-2">
					<!-- Skills -->
					<div class="flex gap-2">
						<div class="w-[60px] h-[60px] border">
							<span class="bg-white px-1 text-black">Q</span>
						</div>
						<div class="w-[60px] h-[60px] border">
							<span class="bg-white px-1 text-black">W</span>
						</div>
						<div class="w-[60px] h-[60px] border">
							<span class="bg-white px-1 text-black">E</span>
						</div>
						<div class="w-[60px] h-[60px] border">
							<span class="bg-white px-1 text-black">R</span>
						</div>
					</div>
					<!-- HP+MP Bar -->
					<div class="flex flex-col gap-1">
						<div class="w-full bg-green-700 text-center">
							{$selected_creature.hp}/{$selected_creature.maxHp}
						</div>
						<div class="w-full bg-blue-600 text-center">0/0</div>
					</div>
				</div>
				<!-- Stats -->
				<div>
					<div class="flex w-[100px] flex-col items-end">
						<div>{$selected_creature.attack} ATK</div>
						<div>{$selected_creature.defense} DEF</div>
						<div>{$selected_creature.initiative} INI&nbsp&nbsp</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
