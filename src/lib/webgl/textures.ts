import { abilityFolders } from './abilityFolders';

// Import WebGL-related types
type WebGLTextureMap = { [key: string]: WebGLTexture };

// Static array for creature and background textures
const staticTexturePaths = [
	'/monster/card_001.png',
	'/monster/card_002.png',
	'/monster/card_003.png',
	'/bg/current.png',
];

// Utility function to load textures from paths
export function loadTextureFromPath(
	gl: WebGLRenderingContext,
	imageUrl: string
): Promise<WebGLTexture> {
	return new Promise((resolve, reject) => {
		const texture = gl.createTexture();
		if (!texture) {
			reject(new Error('Failed to create texture'));
			return;
		}

		const image = new Image();
		image.crossOrigin = 'anonymous';
		image.src = imageUrl;

		image.onload = () => {
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

			resolve(texture);
		};

		image.onerror = () => {
			reject(new Error(`Failed to load texture from ${imageUrl}`));
		};
	});
}

// Function to load all textures (creature, background, and ability textures)
export async function loadAllTextures(gl: WebGLRenderingContext): Promise<WebGLTextureMap> {
	const textureMap: WebGLTextureMap = {};

	// Load static creature and background textures
	await Promise.all(
		staticTexturePaths.map(async path => {
			textureMap[path] = await loadTextureFromPath(gl, path);
		})
	);

	// Load ability textures
	for (const ability of abilityFolders) {
		const { path, frameCount } = ability;

		await Promise.all(
			Array.from({ length: frameCount }).map(async (_, i) => {
				const frameName = `${i.toString().padStart(4, '0')}.png`;
				const fullPath = `${path}/${frameName}`;
				textureMap[fullPath] = await loadTextureFromPath(gl, fullPath);
			})
		);
	}

	return textureMap;
}
