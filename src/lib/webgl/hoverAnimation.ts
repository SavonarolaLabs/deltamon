import type { SlotRenderData } from '$lib/types';

export function applyHoverAnimation(slot: SlotRenderData, time: number): SlotRenderData {
	const hoverAmplitude = 10;
	const hoverSpeed = 0.003;

	const hoverOffset = hoverAmplitude * Math.sin(time * hoverSpeed);

	return {
		...slot,
		y: slot.originalY - hoverOffset,
		scale: 0.8,
	};
}
