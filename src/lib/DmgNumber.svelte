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
		font-size: 32px;
		font-weight: bold;
		color: red;
		text-shadow: 1.5px 1.5px 0px rgba(0, 0, 0, 1); /* Hard shadow bottom-right */
		position: absolute;
		bottom: 0;
		left: 0;
		transform-origin: left bottom; /* Shift the transform origin to the left */
		transform: perspective(300px) rotateY(-15deg) skewX(-10deg); /* Perspective effect for larger right side */
		animation: damage-pop 0.85s ease-out forwards; /* Shortened duration to maintain speed */
	}

	@keyframes damage-pop {
		0% {
			transform: scale(0.9) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 1;
		}
		5% {
			color: rgb(237, 245, 199);
		}
		10% {
			transform: scale(1.1);
			color: rgb(237, 245, 199);
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
		}
		75% {
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
			color: rgb(255, 88, 88);
			opacity: 1;
		}
		95% {
			transform-origin: center;
			transform: scale(1, 0.8) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0.8;
		}
		100% {
			transform-origin: center;
			transform: scale(1, 0.1) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0;
		}
	}
</style>
