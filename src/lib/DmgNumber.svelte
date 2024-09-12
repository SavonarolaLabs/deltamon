<script>
	//https://cartooncoffee.itch.io/fire-vfx
	export let damage = 0;

	let randomOffsetX = (Math.random() - 0.5) * 70;
	let randomOffsetY = (Math.random() - 0.5) * 70;

	let adjustedOffsetX = randomOffsetX - 20;
</script>

<div
	class="damage-number-wrapper"
	style="transform: translate({adjustedOffsetX}px, {randomOffsetY}px);"
>
	<div class="damage-number">
		{damage}!
	</div>
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

	.damage-number-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.damage-number {
		font-family: "Inter", sans-serif;
		font-size: 42px;
		font-weight: bold;
		color: red;
		text-shadow: 1.5px 1.5px 0px rgba(0, 0, 0, 1);
		transform: perspective(300px) rotateY(-15deg) skewX(-10deg);
		animation: damage-pop 0.85s ease-out forwards;
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
		30% {
			color: rgb(237, 245, 199);
			transform: scale(1.125) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
		}
		60% {
			color: rgb(255, 88, 88);
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
		}
		75% {
			transform: scale(1) perspective(300px) rotateY(-15deg) skewX(-10deg);
			color: rgb(255, 88, 88);
			opacity: 1;
		}
		95% {
			transform-origin: center;
			transform: scale(0.5, 0.3) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0.8;
		}
		100% {
			transform-origin: center;
			transform: scale(0.4, 0.3) perspective(300px) rotateY(-15deg)
				skewX(-10deg);
			opacity: 0;
		}
	}
</style>
