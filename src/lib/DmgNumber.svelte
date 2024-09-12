<script>
	export let damage = 0;
</script>

<div class="damage-number">
	{damage}!
</div>

<style>
	@font-face {
		font-family: "Inter";
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			local("Inter"),
			url("/path-to-inter-variable-font.woff2") format("woff2");
	}

	.damage-number {
		font-family: "Inter", sans-serif;
		font-size: 24px;
		font-weight: bold;
		color: red;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
		position: absolute;
		bottom: 0;
		left: 0;
		transform-origin: center;
		animation: damage-pop 1s ease-out forwards;
	}

	@keyframes damage-pop {
		0% {
			transform: scale(1.1);
			opacity: 1;
		}
		5% {
			color: white;
		}
		10% {
			color: white;
			transform: scale(1);
		}
		30% {
		}
		60% {
			color: red;
		}
		75% {
			transform: scale(1);
			opacity: 1;
		}
		90% {
			transform: scale(0.5);
			opacity: 0;
		}
		100% {
			transform: scale(0.5);
			opacity: 0;
		}
	}
</style>
