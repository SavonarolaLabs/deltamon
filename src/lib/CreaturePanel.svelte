<script lang="ts">
	import { base } from "$app/paths";
	import { abilities } from "./pvp/abilities";
	import { selected_creature } from "./pvpuistate";
</script>

{#if $selected_creature}
	<div
		class=" bg-gray-800 text-white p-4 z-50 w-[fit-content] fixed bottom-0 left-1/2 -translate-x-1/2"
		style="z-index:2000"
	>
		<div class="flex-flex-col">
			<!-- Name + Buffs+Debuffs -->
			<div class="flex items-end">
				{$selected_creature.bcId}
			</div>
			<div class="flex gap-4">
				<!-- Avatar -->
				<div style="width:130px;">
					<img src="{base}/monster/{$selected_creature.img}" alt="" />
				</div>
				<!-- Skills + Bars -->
				<div class="flex flex-col gap-4">
					<div class="flex gap-2">
						{#each ["Q", "W", "E", "R"] as key, index}
							<div
								class="relative w-[60px] h-[60px] border flex items-center justify-center"
								style={$selected_creature.abilities[index + 1]
									? `background-size: contain; background-image: url(${base}/spells/${$selected_creature.abilities[index + 1].icon});`
									: ""}
							>
								<span
									class="absolute -bottom-2 bg-white px-1 text-black text-xs font-bold"
									>{key}</span
								>
							</div>
						{/each}
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
