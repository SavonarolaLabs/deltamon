let config = {
	mute: true,
};

export function playAudio(src: string, playbackRate: number = 1, startTime: number = 0) {
	if (config.mute) {
		return;
	}
	const audio = new Audio(src);
	audio.playbackRate = playbackRate;
	audio.currentTime = startTime;
	audio.play();
}

export function playAudioAfterDelay(src: string, delay: number) {
	if (config.mute) {
		return;
	}
	setTimeout(() => {
		const audio = new Audio(src);
		audio.play();
	}, delay);
}
