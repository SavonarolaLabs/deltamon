<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { initWebGL } from "$lib/webgl/initWebGL";
	import { game } from "$lib/pvp/game";
	import { drawScene } from "./draw";

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null;
	let shaderProgram: WebGLProgram | null;
	let buffers: any;

	function handleResize() {
		if (!canvas || !gl) return;

		const displayWidth = canvas.clientWidth;
		const displayHeight = canvas.clientHeight;
		const needResize =
			canvas.width !== displayWidth || canvas.height !== displayHeight;

		if (needResize) {
			canvas.width = displayWidth;
			canvas.height = displayHeight;
			gl.viewport(0, 0, displayWidth, displayHeight);

			// Redraw the scene here
			drawScene(gl, shaderProgram, buffers);
		}
	}

	onMount(() => {
		const result = initWebGL(canvas, game);
		if (result) {
			({ gl, shaderProgram, buffers } = result);
			handleResize(); // Initial resize
			window.addEventListener("resize", handleResize);
		} else {
			console.error("WebGL initialization failed");
		}
	});

	onDestroy(() => {
		window.removeEventListener("resize", handleResize);

		// Clean up WebGL resources
		if (gl) {
			gl.deleteProgram(shaderProgram);
			gl.deleteBuffer(buffers.positionBuffer);
			gl.deleteBuffer(buffers.textureCoordBuffer);
			// Delete any other buffers or textures you've created
		}
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		width: 100%;
		height: 100vh;
		display: block;
	}
</style>
