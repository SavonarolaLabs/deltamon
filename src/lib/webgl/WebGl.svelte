<script lang="ts">
	import { onMount } from "svelte";
	import vertCode from "./shader.vert";
	import fragCode from "./shader.frag";

	let canvas: HTMLCanvasElement;

	function initWebGL() {
		let gl = canvas.getContext("webgl");
		if (gl) {
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			gl.clearColor(1, 1, 0, 1);

			const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
			gl.shaderSource(vertShader, vertCode);
			gl.compileShader(vertShader);

			const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
			gl.shaderSource(fragShader, fragCode);
			gl.compileShader(fragShader);

			const shaderProgram = gl.createProgram()!;
			gl.attachShader(shaderProgram, vertShader);
			gl.attachShader(shaderProgram, fragShader);
			gl.linkProgram(shaderProgram);
			gl.useProgram(shaderProgram);

			const vertices = new Float32Array([
				0.0, 1.0, -1.0, -1.0, 1.0, -1.0,
			]);
			gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
			gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

			const coord = gl.getAttribLocation(shaderProgram, "coordinates");
			gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
			gl.enableVertexAttribArray(coord);

			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		}
	}

	onMount(() => {
		initWebGL();
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
