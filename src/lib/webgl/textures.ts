import type { TextureMetadata, TextureMetadataMap } from '$lib/types';
import { abilityFolders } from './abilityFolders';

// Static array for creature and background textures
const staticTexturePaths = [
	'/monster/card_001.png',
	'/monster/card_002.png',
	'/monster/card_003.png',
	'/bg/current.png',
];

// Utility function to load textures from paths and also return their metadata
export function loadTextureFromPath(gl: WebGLRenderingContext, imageUrl: string): Promise<TextureMetadata> {
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

			// Upload the image into the texture.
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			// Set texture parameters
			// Since we're using NPOT textures, we must use CLAMP_TO_EDGE and
			// min/mag filters that do not require mipmaps.
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

			// Return texture and metadata in a single object
			resolve({
				texture,
				width: image.width,
				height: image.height,
				aspectRatio: image.width / image.height,
			});
		};

		image.onerror = () => {
			reject(new Error(`Failed to load texture from ${imageUrl}`));
		};
	});
}

// Function to load all textures (creature, background, and ability textures)
// and return a combined map
export async function loadAllTextures(gl: WebGLRenderingContext): Promise<TextureMetadataMap> {
	const textureMetadataMap: TextureMetadataMap = {};

	// Load static creature and background textures
	await Promise.all(
		staticTexturePaths.map(async path => {
			try {
				const metadata = await loadTextureFromPath(gl, path);
				textureMetadataMap[path] = metadata;
			} catch (error) {
				console.error(error);
			}
		})
	);

	// Load ability textures
	for (const ability of abilityFolders) {
		const { path, frameCount } = ability;

		await Promise.all(
			Array.from({ length: frameCount }).map(async (_, i) => {
				const frameName = `${i.toString().padStart(4, '0')}.png`;
				const fullPath = `${path}/${frameName}`;
				try {
					const metadata = await loadTextureFromPath(gl, fullPath);
					textureMetadataMap[fullPath] = metadata;
				} catch (error) {
					console.error(error);
				}
			})
		);
	}

	return textureMetadataMap;
}
