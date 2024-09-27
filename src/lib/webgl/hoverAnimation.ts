import type { SlotRenderData } from '$lib/types';

let hoverStartTime: number | null = null;

export function applyHoverAnimation(slot: SlotRenderData, time: number): SlotRenderData {
	const hoverAmplitude = 0.0006; // Adjust for how far the slot moves up and down
	const hoverSpeed = 0.003; // Adjust for how fast the slot moves

	if (!hoverStartTime) hoverStartTime = time;

	// Calculate vertical offset based on sine wave for smooth hovering effect
	const elapsedTime = (time - hoverStartTime) * hoverSpeed;
	const hoverOffset = hoverAmplitude * Math.sin(elapsedTime);

	return {
		...slot,
		scale: 0.34,
		y: slot.y - hoverOffset / 2, // Apply vertical oscillation to the `y` position
	};
}
