<script lang="ts">
	import { base } from "$app/paths";
	import { abilities } from "./pvp/abilities";
	import { selected_creature } from "./pvpuistate";
</script>

{#if $selected_creature}
	<div
		class=" text-white z-50 w-[fit-content] fixed bottom-0 left-1/2 -translate-x-1/2"
		style="z-index:2000"
	>
		<div class="flex-flex-col">
			<!-- Name + Buffs+Debuffs -->
			<div
				class="flex items-end text-white text-md font-bold"
				style="text-shadow: 2px 2px 0px black;"
			>
				{$selected_creature.name}
			</div>

			<div class="flex gap-4 bg-gray-800">
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
						<div class="w-full bg-blue-600 text-center">
							{$selected_creature.mp}/{$selected_creature.maxMp}
						</div>
					</div>
				</div>
				<!-- Stats -->
				<div class="pr-2">
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
