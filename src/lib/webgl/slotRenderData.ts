import type { GameState, SlotRenderData } from '$lib/types';

/* prettier-ignore */
const GY = 0.15;
/* prettier-ignore */
const X1 = 0.8, X2 = X1 - 0.3;
/* prettier-ignore */
const Y1 = 0.55, Y2 = Y1 - 0.45, Y3 = Y1 - 0.45 * 2;
/* prettier-ignore */
const slotPositions = [
    [-X1, Y1],      [-X2, Y1],      [X2, Y1],      [X1, Y1],
    [-X1, Y2 - GY], [-X2, Y2 - GY], [X2, Y2 - GY], [X1, Y2 - GY],
    [-X1, Y3 - GY*2], [-X2, Y3 - GY*2], [X2, Y3 - GY*2], [X1, Y3 - GY*2]
];
/* prettier-ignore */
const indexMap = [
    0, 1, 4, 5, 8, 9,
    2, 3, 6, 7, 10, 11
];

export function initializeSlotRenderData(game: GameState): SlotRenderData[] {
	return game.slots.map((slot, index) => {
		const playerId = slot.creature?.playerId || 0;
		const texturePath = slot.creature ? `/monster/${slot.creature.img}` : '';

		// Get slot position based on index
		const [x, y] = getSlotPosition(index);

		return {
			slotIndex: index,
			playerId,
			texturePath,
			x,
			y,
			scale: 0.33, // default scale, adjust as needed
			zIndex: 0, // default z-index
			isHovered: false,
			originalX: x,
			originalY: y,
		};
	});
}

function getSlotPosition(index: number): [number, number] {
	return slotPositions[indexMap[index]] as [number, number];
}
