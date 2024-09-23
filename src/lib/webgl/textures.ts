function loadTextureFromPath(
	gl: WebGLRenderingContext,
	imageUrl: string,
	basePath: string
): Promise<WebGLTexture> {
	return new Promise((resolve, reject) => {
		const texture = gl.createTexture();
		if (!texture) {
			reject(new Error('Failed to create texture'));
			return;
		}

		const image = new Image();
		image.crossOrigin = 'anonymous'; // Enable loading from other domains if needed
		image.src = basePath + imageUrl;

		image.onload = () => {
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			// Set texture parameters for non-mipmapped textures
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

			resolve(texture);
		};

		image.onerror = () => {
			reject(new Error(`Failed to load texture from ${basePath}${imageUrl}`));
		};
	});
}

export function loadCreatureTexture(
	gl: WebGLRenderingContext,
	imageUrl: string
): Promise<WebGLTexture> {
	return loadTextureFromPath(gl, imageUrl, '/monster/');
}

export function loadBackgroundTexture(
	gl: WebGLRenderingContext,
	imageUrl: string
): Promise<WebGLTexture> {
	return loadTextureFromPath(gl, imageUrl, '/bg/');
}

export async function loadAbilityTextures(
	gl: WebGLRenderingContext,
	abilityFolder: { name: string; path: string; frameCount: number }
): Promise<WebGLTexture[]> {
	const textures: WebGLTexture[] = [];
	const basePath = abilityFolder.path + '/';

	const loadPromises = Array.from({ length: abilityFolder.frameCount }, (_, i) => {
		const frameName = `${i.toString().padStart(4, '0')}.png`;
		return loadTextureFromPath(gl, frameName, basePath);
	});

	return Promise.all(loadPromises);
}
