import { game } from '$lib/pvp/game';
import { initBuffers } from './buffers';
import { drawBackground } from './drawBackground';

const GAP = 0.15;
// prettier-ignore
const slotPositions = [
    [-0.65, 0.6],        [-0.37, 0.6], [0.37, 0.6], [0.65, 0.6],  // Row 1
    [-0.65, 0.15-GAP],    [-0.37, 0.15-GAP], [0.37, 0.15-GAP], [0.65, 0.15-GAP],  // Row 2
    [-0.65, -0.3-GAP*2], [-0.37, -0.3-GAP*2], [0.37, -0.3-GAP*2], [0.65, -0.3-GAP*2] // Row 3
];

// prettier-ignore
const indexMap = [
    0, 1, 4, 5, 8, 9,
    2, 3, 6, 7, 10, 11
];

function getSlotPosition(index: number): [number, number] {
	return slotPositions[indexMap[index]];
}

export function drawScene(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	creatureTextures: { [key: string]: WebGLTexture },
	backgroundTexture: WebGLTexture,
	abilityTextures: { [key: string]: WebGLTexture[] },
	currentAbilityName: string,
	currentFrame: number
) {
	gl.clear(gl.COLOR_BUFFER_BIT);

	const { positionBuffer, textureCoordBuffer } = initBuffers(gl);

	// Draw the background
	drawBackground(gl, shaderProgram, positionBuffer, textureCoordBuffer, backgroundTexture);

	// Set up shared attributes
	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');

	gl.enableVertexAttribArray(positionAttribute);
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.uniform1i(samplerUniform, 0);

	// Draw creatures in slots
	game.slots.forEach((slot, index) => {
		if (slot.creature) {
			const texture = creatureTextures[slot.creature.img];
			if (texture) {
				const [x, y] = getSlotPosition(index);
				drawSlot(
					gl,
					shaderProgram,
					positionBuffer,
					textureCoordBuffer,
					texture,
					x,
					y,
					positionAttribute,
					textureCoordAttribute
				);
			} else {
				console.error(`Texture not found for creature img: ${slot.creature.img}`);
			}
		}
	});

	// Draw the current ability frame in the middle of the screen
	const currentAbilityFrames = abilityTextures[currentAbilityName];
	if (currentAbilityFrames && currentAbilityFrames.length > 0) {
		const frame = currentAbilityFrames[currentFrame % currentAbilityFrames.length];
		drawAbility(
			gl,
			shaderProgram,
			positionBuffer,
			textureCoordBuffer,
			frame,
			0,
			0,
			0.5,
			positionAttribute,
			textureCoordAttribute
		);
	}
}

function drawAbility(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	texture: WebGLTexture,
	x: number,
	y: number,
	scale: number,
	positionAttribute: number,
	textureCoordAttribute: number
) {
	const { scaleX, scaleY } = calculateScaling(gl, scale, 1);
	setPositionBuffer(gl, positionBuffer, x + 0.33, y - 0.14, scaleX, scaleY, positionAttribute);
	bindTextureAndCoordsFlipped(gl, texture, textureCoordBuffer, textureCoordAttribute);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function drawSlot(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	texture: WebGLTexture,
	x: number,
	y: number,
	positionAttribute: number,
	textureCoordAttribute: number
) {
	const { scaleX, scaleY } = calculateScaling(gl, 0.19, 1);
	setPositionBuffer(gl, positionBuffer, x, y, scaleX, scaleY, positionAttribute);
	bindTextureAndCoords(gl, texture, textureCoordBuffer, textureCoordAttribute);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function calculateScaling(gl: WebGLRenderingContext, scale: number, imgAspectRatio: number) {
	const canvasAspectRatio = gl.canvas.width / gl.canvas.height;
	const cardAspectRatio = 355 / 542; // Aspect ratio for your cards

	let scaleX = scale;
	let scaleY = scaleX / cardAspectRatio; // Use the card aspect ratio

	// Adjust scaling to maintain aspect ratio relative to the canvas
	if (canvasAspectRatio > 1) {
		scaleX /= canvasAspectRatio;
	} else {
		scaleY *= canvasAspectRatio;
	}

	return { scaleX, scaleY };
}

function setPositionBuffer(
	gl: WebGLRenderingContext,
	positionBuffer: WebGLBuffer,
	x: number,
	y: number,
	scaleX: number,
	scaleY: number,
	positionAttribute: number
) {
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	//prettier-ignore
	const positions = new Float32Array([
        -scaleX + x, scaleY + y,
        -scaleX + x, -scaleY + y,
        scaleX + x, scaleY + y,
        scaleX + x, -scaleY + y,
    ]);
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
}

function bindTextureAndCoords(
	gl: WebGLRenderingContext,
	texture: WebGLTexture,
	textureCoordBuffer: WebGLBuffer,
	textureCoordAttribute: number
) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
}

function bindTextureAndCoordsFlipped(
	gl: WebGLRenderingContext,
	texture: WebGLTexture,
	textureCoordBuffer: WebGLBuffer,
	textureCoordAttribute: number
) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

	//prettier-ignore
	const flippedTexCoords = new Float32Array([
		1.0, 0.0, // Top-right
		1.0, 1.0, // Bottom-right
		0.0, 0.0, // Top-left
		0.0, 1.0  // Bottom-left
	]);
	gl.bufferData(gl.ARRAY_BUFFER, flippedTexCoords, gl.STATIC_DRAW);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
}
