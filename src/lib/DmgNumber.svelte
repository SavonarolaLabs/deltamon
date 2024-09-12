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
		text-shadow: 1.5px 1.5px 0px rgba(0, 0, 0, 1); /* Hard shadow bottom-right */
		position: absolute;
		bottom: 0;
		left: 0;
		transform-origin: left bottom; /* Shift the transform origin to the left */
		transform: perspective(300px) rotateY(-15deg) skewX(-10deg); /* Perspective effect for larger right side */
		animation: damage-pop 1s ease-out forwards;
	}

	@keyframes damage-pop {
		0% {
			transform: scale(1.1) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 1;
		}
		5% {
			color: rgb(237, 245, 199);
		}
		10% {
			color: rgb(237, 245, 199);
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
		}
		30% {
		}
		60% {
			color: red;
		}
		75% {
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
			opacity: 1;
		}
		90% {
			transform-origin: center; /* Change transform origin to center */
			transform: scale(0.5) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0;
		}
		100% {
			transform-origin: center; /* Keep shrinking towards the center */
			transform: scale(0.5) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0;
		}
	}
</style>
