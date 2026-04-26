function isPowerOfTwo(n: number) {
	return (n * (n - 1)) == 0
}

function placeholderTexture(
	gl: WebGLRenderingContext, 
	color: Float32Array
): WebGLTexture {
	const texture = gl.createTexture()
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		1,
		1,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		new Uint8Array(color.map(v => Math.floor(255 * v)))
	)
	return texture
}

function loadTexture(
	gl: WebGLRenderingContext,
	url: string,
	fallbackColor: Float32Array
): () => WebGLTexture {

	const texture = placeholderTexture(gl, fallbackColor)

	const image = new Image()
	image.src = url

	image.addEventListener("load", e => {
		gl.bindTexture(gl.TEXTURE_2D, texture)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.RGBA,
			gl.RGBA,
			gl.UNSIGNED_BYTE,
			image
		)

		if (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) {
			gl.generateMipmap(gl.TEXTURE_2D)
			gl.texParameteri(
				gl.TEXTURE_2D, 
				gl.TEXTURE_MIN_FILTER, 
				gl.LINEAR_MIPMAP_LINEAR
			)
			gl.texParameteri(
				gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT
			)
			gl.texParameteri(
				gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
			)
		} else {
			gl.texParameteri(
				gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR
			)
			gl.texParameteri(
				gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE
			)
			gl.texParameteri(
				gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE
			)
		}		
	})

	return function() {
		return texture
	}
}

export default loadTexture
