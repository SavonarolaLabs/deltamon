import type { GameState, SlotRenderData } from '$lib/types';

export function initializeSlotRenderData(game: GameState, gl: WebGLRenderingContext): SlotRenderData[] {
	const slotRenderData: SlotRenderData[] = [];

	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;

	// Number of columns and rows for slot arrangement
	const cols = 6;
	const rows = 2;

	// Calculate spacing between slots
	const xSpacing = canvasWidth / (cols + 1);
	const yPositions = [canvasHeight * 0.25, canvasHeight * 0.75]; // Adjust as needed

	for (let index = 0; index < game.slots.length; index++) {
		const slot = game.slots[index];
		const playerId = slot.creature?.playerId || 1; // Assuming default playerId is 1
		const texturePath = slot.creature ? `/monster/${slot.creature.img}` : '';

		// Column index
		const col = index % cols;

		// X position
		const x = xSpacing * (col + 1);

		// Y position based on player ID
		const y = playerId === 1 ? yPositions[1] : yPositions[0];

		// Adjust scale as needed (now in pixels)
		const scale = 0.5; // Adjust based on your texture sizes

		slotRenderData.push({
			slotIndex: index,
			playerId,
			texturePath,
			x,
			y,
			scale,
			zIndex: 0,
			isHovered: false,
			originalX: x,
			originalY: y,
		});
	}

	return slotRenderData;
}
