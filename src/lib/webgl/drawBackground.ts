export function drawBackground(
	gl: WebGLRenderingContext,
	shaderProgram: WebGLProgram,
	positionBuffer: WebGLBuffer,
	textureCoordBuffer: WebGLBuffer,
	backgroundTexture: WebGLTexture | null
) {
	const canvasWidth = gl.canvas.width;
	const canvasHeight = gl.canvas.height;

	// Размеры изображения (например, 1792 x 1024)
	const imageWidth = 1792;
	const imageHeight = 1024;

	// Расчет соотношений
	const widthRatio = imageWidth / canvasWidth;
	const heightRatio = imageHeight / canvasHeight;

	let width, height;

	// Берем наименьшее из соотношений для масштабирования
	if (widthRatio < heightRatio) {
		// Высота картинки доминирует
		width = 2.0; // Масштабируем по ширине
		height = (heightRatio / widthRatio) * 2.0; // Масштабируем по меньшей стороне, обрезая по высоте
	} else {
		// Ширина картинки доминирует
		height = 2.0; // Масштабируем по высоте
		width = (widthRatio / heightRatio) * 2.0; // Масштабируем по меньшей стороне, обрезая по ширине
	}

	// Устанавливаем вершинные позиции для заднего фона (сохранение пропорций)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// prettier-ignore
	const modifiedPositions = new Float32Array([
		-width / 2,  height / 2,   // Верхний левый угол
		-width / 2, -height / 2,   // Нижний левый угол
		 width / 2,  height / 2,   // Верхний правый угол
		 width / 2, -height / 2    // Нижний правый угол
	]);
	gl.bufferData(gl.ARRAY_BUFFER, modifiedPositions, gl.STATIC_DRAW);

	// Привязка атрибута позиции и текстурных координат
	const positionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
	gl.enableVertexAttribArray(positionAttribute);
	gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

	// Привязка текстуры фона
	if (backgroundTexture) {
		gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
	const textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
	gl.enableVertexAttribArray(textureCoordAttribute);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	const samplerUniform = gl.getUniformLocation(shaderProgram, 'uSampler');
	gl.uniform1i(samplerUniform, 0);

	// Отрисовка заднего фона
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
