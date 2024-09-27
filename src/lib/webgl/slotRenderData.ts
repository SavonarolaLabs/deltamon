import type { GameState, SlotRenderData } from '$lib/types';

export function initializeSlotRenderData(game: GameState, gl: WebGLRenderingContext): SlotRenderData[] {
	const slotRenderData: SlotRenderData[] = [];

	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;

	// Original slot position constants
	const GY = 0.15;
	const X1 = 0.8,
		X2 = X1 - 0.3;
	const Y1 = 0.55,
		Y2 = Y1 - 0.45,
		Y3 = Y1 - 0.45 * 2;

	// Array of normalized positions based on old logic
	const slotPositions = [
		[-X1, Y1],
		[-X2, Y1],
		[X2, Y1],
		[X1, Y1],
		[-X1, Y2 - GY],
		[-X2, Y2 - GY],
		[X2, Y2 - GY],
		[X1, Y2 - GY],
		[-X1, Y3 - GY * 2],
		[-X2, Y3 - GY * 2],
		[X2, Y3 - GY * 2],
		[X1, Y3 - GY * 2],
	];

	// Map of index order based on your original layout
	const indexMap = [0, 1, 4, 5, 8, 9, 2, 3, 6, 7, 10, 11];

	for (let index = 0; index < game.slots.length; index++) {
		const slot = game.slots[index];
		const playerId = slot.creature?.playerId || 1; // Assuming default playerId is 1
		const texturePath = slot.creature ? `/monster/${slot.creature.img}` : '';

		// Get slot position index based on original mapping
		const positionIndex = indexMap[index];

		// Get the normalized position
		const [normX, normY] = slotPositions[positionIndex];

		// Convert normalized positions to pixel positions
		const x = ((normX + 1) / 2) * canvasWidth;
		const y = ((1 - normY) / 2) * canvasHeight;

		// Adjust scale as needed (now in pixels)
		const scale = 0.66; // Adjust based on your texture sizes

		slotRenderData.push({
			slotIndex: index,
			playerId,
			texturePath,
			x,
			y,
			scale,
			zIndex: index == 1 ? 1 : 0,
			isHovered: false,
			originalX: x,
			originalY: y,
		});
	}

	return slotRenderData;
}
