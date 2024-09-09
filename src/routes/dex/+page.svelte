<script lang="ts">
	import { base } from "$app/paths";

	import Navigation from "$lib/Navigation.svelte";
	import Filter from "$lib/Filter.svelte";
	import { nft_details_popup_nft, nft_details_popup_show } from "$lib/store";
	import MonsterPopup from "$lib/MonsterPopup.svelte";
	import { creatureImages } from "$lib/creatureImages";

	function openInPopup(nft) {
		nft_details_popup_nft.set(nft);
		nft_details_popup_show.set(true);
	}
</script>

<Navigation></Navigation>
<MonsterPopup></MonsterPopup>
<div class="flex">
	<div class="" style="">
		<div
			style="position: sticky; top: 80px;"
			class="filters flex items-center p-2 pl-3"
		>
			<Filter></Filter>
		</div>
	</div>
	<div class="flex flex-col pt-5">
		{#each creatureImages as monster, i}
			<!-- Render each monster evolution in a row -->
			<div class="flex mb-5">
				{#each monster as evolution}
					<div class="flex flex-col items-center">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div on:click={() => openInPopup(evolution)}>
							<img
								src={base + "/monster/" + evolution}
								alt=""
								style="width:250px;"
							/>
						</div>
						<div>{evolution.split(".")[0]}</div>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.grow {
		transition: all 0.2s ease-in-out;
	}
	.grow:hover {
		transform: scale(1.05);
	}
	.numba {
		width: fit-content;
		background-color: #00000094;
		border-radius: 15px;
		color: white;
		padding-left: 1em;
		padding-right: 1em;
		font-family: "system-ui";
		font-size: small;
		font-weight: 500;
	}
</style>
