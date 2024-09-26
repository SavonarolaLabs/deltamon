export function playAudio(src: string, playbackRate: number = 1, startTime: number = 0) {
	const audio = new Audio(src);
	audio.playbackRate = playbackRate;
	audio.currentTime = startTime;
	audio.play();
}

export function playAudioAfterDelay(src: string, delay: number) {
	setTimeout(() => {
		const audio = new Audio(src);
		audio.play();
	}, delay);
}
