// Core function for loading textures
function loadTextureFromPath(
	gl: WebGLRenderingContext,
	imageUrl: string,
	basePath: string,
	callback: (texture: WebGLTexture) => void
) {
	const texture = gl.createTexture();
	const image = new Image();
	image.src = basePath + imageUrl;

	image.onload = () => {
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			image
		);

		// Set texture parameters for non-mipmapped textures
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

		callback(texture);
	};

	image.onerror = () => {
		console.error(`Failed to load texture from ${basePath}${imageUrl}`);
	};
}

export function loadCreatureTexture(
	gl: WebGLRenderingContext,
	imageUrl: string,
	callback: (texture: WebGLTexture) => void
) {
	loadTextureFromPath(gl, imageUrl, "/monster/", callback);
}

export function loadBackgroundTexture(
	gl: WebGLRenderingContext,
	imageUrl: string,
	callback: (texture: WebGLTexture) => void
) {
	loadTextureFromPath(gl, imageUrl, "/bg/", callback);
}
