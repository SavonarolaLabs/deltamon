<script>
	export let direction = "up"; // Default to "up"
</script>

<div class="triangle-container" class:down={direction === "down"}>
	<div
		class="triangle"
		style="--triangle-color: {direction === 'up' ? '#4CAF50' : '#F44336'}"
	></div>
</div>

<style>
	.triangle-container {
		width: 2em;
		height: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: transform 0.3s;
	}

	.triangle {
		position: relative;
		text-align: left;
		width: 1em;
		height: 1em;
		border-top-right-radius: 30%;
		transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
		background-color: var(--triangle-color);
		transition: background-color 0.3s;
	}

	.triangle:before,
	.triangle:after {
		content: "";
		position: absolute;
		background-color: inherit;
		width: 1em;
		height: 1em;
		border-top-right-radius: 30%;
	}

	.triangle:before {
		transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
			translate(0, -50%);
	}

	.triangle:after {
		transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414)
			translate(50%);
	}

	/* Rotate the triangle container for the "down" direction */
	.triangle-container.down {
		transform: rotate(180deg);
	}
</style>
