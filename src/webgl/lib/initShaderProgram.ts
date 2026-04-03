/**
 * Initialize a shader program from the shader source code (as strings).
 *
 * @param gl the WebGL rendering context to create the program for.
 * @param vShaderSource the source code for a vertex shader.
 * @param fShaderSource the source code for a fragment shader.
 * @returns returns the shader program if it was successfully created. If an 
 * error occurred, returns `null` and logs the error to the console.
 */
function initShaderProgram(
	gl: WebGLRenderingContext, 
	vShaderSource: string, 
	fShaderSource: string
): WebGLProgram | null {

	const loadShader = (type: GLenum, source: string): WebGLShader | null => {
		const shader = gl.createShader(type)
		if (shader == null) {
			console.error(`Failed to create shader:\n${source}`)
			return null
		}

		gl.shaderSource(shader, source)
		gl.compileShader(shader)

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(
				`An error occurred compiling the shaders:\n${
					gl.getShaderInfoLog(shader)
				}`,
			)
			gl.deleteShader(shader)
			return null
		}

		return shader
	}

	const vShader = loadShader(gl.VERTEX_SHADER, vShaderSource)
	const fShader = loadShader(gl.FRAGMENT_SHADER, fShaderSource)
	if (vShader == null || fShader == null) {
		return null
	}

	const shaderProgram = gl.createProgram()
	gl.attachShader(shaderProgram, vShader)
	gl.attachShader(shaderProgram, fShader)
	gl.linkProgram(shaderProgram)

	// if creating the shader program failed, log an error.
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.error(
			`Unable to initialize the shader program:\n${
				gl.getProgramInfoLog(shaderProgram)
			}`,
		)
		return null
	}

	return shaderProgram
}

export default initShaderProgram
