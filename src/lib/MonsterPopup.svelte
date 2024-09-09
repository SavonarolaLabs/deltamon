<script lang="ts">
    import { nft_details_popup_nft, nft_details_popup_show } from "./store";
</script>

{#if $nft_details_popup_show}
    <div
        class="fixed min-h-full w-full flex flex-col items-center justify-center"
        style="overflow-y: auto;z-index:999; top:0;left:0;"
    >
        <div
            on:click={() => nft_details_popup_show.set(false)}
            style="height:100vh;width:100%;z-index:998;position:absolute;"
        />
        <div
            class="relative flex justify-center p-4 rounded shadow-xl"
            style="background:white; border:1px solid lightgray; z-index:1000;"
        >
            <div class="absolute p-3" style="right:0; top:0;">
                <button on:click={() => nft_details_popup_show.set(false)}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            d="M12.6667 3.33333L3.33333 12.6667"
                            stroke-miterlimit="10"
                        /><path
                            d="M3.33333 3.33333L12.6667 12.6667"
                            stroke-miterlimit="10"
                        /></svg
                    >
                </button>
            </div>
            <div class="w-lg-max uptolg:px-4">
                {#if $nft_details_popup_nft}
                    <div class="flex gap-20 lg:gap-28 justify-center">
                        <div>
                            <img
                                src={$nft_details_popup_nft}
                                alt=""
                                style="width:350px;"
                                class="rounded"
                            />
                        </div>
                        <div class="flex flex-col gap-4">details</div>
                    </div>
                {:else}
                    <div>not found</div>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style>
    .fade-in-2s {
        animation: FadeIn 2s ease-in;
    }
    @keyframes FadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
