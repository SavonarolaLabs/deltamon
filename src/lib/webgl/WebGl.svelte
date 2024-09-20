<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext;
	const imageUrl = "/monster/1_1.jpg"; // Path to the image in your static folder
	let image: HTMLImageElement;

	// Function to adjust canvas size and redraw
	function resizeCanvas() {
		if (!gl || !image) return;

		// Adjust the canvas size
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		// Clear the canvas
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Redraw the texture
		drawTexture();
	}

	// Initialize WebGL and set up shaders, buffers, and texture
	function initWebGL() {
		gl = canvas.getContext("webgl");

		if (!gl) return;

		const vertCode = `
			attribute vec2 coordinates;
			attribute vec2 textureCoord;
			varying vec2 vTextureCoord;
			void main(void) {
			  gl_Position = vec4(coordinates, 0.0, 1.0);
			  vTextureCoord = textureCoord;
			}
		`;

		const fragCode = `
			precision mediump float;
			varying vec2 vTextureCoord;
			uniform sampler2D uSampler;
			void main(void) {
			  gl_FragColor = texture2D(uSampler, vTextureCoord);
			}
		`;

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

		// prettier-ignore
		const vertices = new Float32Array([
			// Vertex positions  // Texture coordinates
			-0.50,  0.50,          1.0,  0.0,   // Top-left corner
			-0.50, -0.50,          1.0,  1.0,   // Bottom-left corner
			0.50, -0.50,           0.0,  1.0,   // Bottom-right corner
			0.50,  0.50,           0.0,  0.0   // Top-right corner
		]);

		const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

		// Create and bind vertex buffer
		const vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		const coord = gl.getAttribLocation(shaderProgram, "coordinates");
		gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 4 * 4, 0);
		gl.enableVertexAttribArray(coord);

		const texCoord = gl.getAttribLocation(shaderProgram, "textureCoord");
		gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
		gl.enableVertexAttribArray(texCoord);

		// Create and bind index buffer
		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

		// Load the texture
		const texture = gl.createTexture();
		image = new Image();
		image.src = imageUrl;
		image.onload = () => {
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				image
			);
			gl.generateMipmap(gl.TEXTURE_2D);

			// Call resizeCanvas to draw initially
			resizeCanvas();
		};
	}

	// Function to redraw the texture while maintaining aspect ratio
	function drawTexture() {
		const aspectRatio = image.width / image.height;
		const canvasAspectRatio = canvas.width / canvas.height;

		let adjustedVertices;
		if (canvasAspectRatio > aspectRatio) {
			// Canvas is wider relative to the image
			const scaleX = aspectRatio / canvasAspectRatio;
			adjustedVertices = new Float32Array([
				-1.0 * scaleX,
				1.0,
				0.0,
				0.0, // Top-left
				-1.0 * scaleX,
				-1.0,
				0.0,
				1.0, // Bottom-left
				1.0 * scaleX,
				-1.0,
				1.0,
				1.0, // Bottom-right
				1.0 * scaleX,
				1.0,
				1.0,
				0.0, // Top-right
			]);
		} else {
			// Canvas is taller relative to the image
			const scaleY = canvasAspectRatio / aspectRatio;
			adjustedVertices = new Float32Array([
				-1.0,
				1.0 * scaleY,
				0.0,
				0.0, // Top-left
				-1.0,
				-1.0 * scaleY,
				0.0,
				1.0, // Bottom-left
				1.0,
				-1.0 * scaleY,
				1.0,
				1.0, // Bottom-right
				1.0,
				1.0 * scaleY,
				1.0,
				0.0, // Top-right
			]);
		}

		// Update vertex buffer with the adjusted vertices
		const vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, adjustedVertices, gl.STATIC_DRAW);

		// Redraw the texture
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	}

	// Set up window resize listener
	onMount(() => {
		initWebGL();
		window.addEventListener("resize", resizeCanvas);
	});

	// Cleanup the resize listener on component destroy
	onDestroy(() => {
		window.removeEventListener("resize", resizeCanvas);
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
