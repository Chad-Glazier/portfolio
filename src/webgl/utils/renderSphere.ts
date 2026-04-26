import { flatten, type Mat4 } from "@min-webgl/matrices"
import type { Sphere } from "./sphere"

function renderSphere(
	gl: WebGLRenderingContext,
	sphere: Sphere,
	program: WebGLProgram,
	model: Mat4,
	view: Mat4,
	projection: Mat4,
	texture: WebGLTexture
): void {

	// Map the locations of different shader variables.

	const loc = {
		aVertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
		aTextureCoord: gl.getAttribLocation(program, "aTextureCoord"),
		uModelMatrix: gl.getUniformLocation(program, "uModelMatrix"),
		uViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
		uProjectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
		uSphereCenter: gl.getUniformLocation(program, "uSphereCenter"),
		uLightPoint: gl.getUniformLocation(program, "uLightPoint"),
		uTexture: gl.getUniformLocation(program, "uTexture")
	}

	gl.useProgram(program)

	// Pass constants to OpenGL.

	gl.uniform3fv(loc.uSphereCenter, new Float32Array([0, 0, 0]))
	gl.uniform3fv(loc.uLightPoint, new Float32Array([0, 0, 0]))

	// Pass the transformation matrices to OpenGL.

	gl.uniformMatrix4fv(loc.uModelMatrix, false, flatten(model))
	gl.uniformMatrix4fv(loc.uViewMatrix, false, flatten(view))
	gl.uniformMatrix4fv(loc.uProjectionMatrix, false, flatten(projection))

	// Pass the vertices to OpenGL.

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.STATIC_DRAW)
	gl.vertexAttribPointer(loc.aVertexPosition, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(loc.aVertexPosition)

	// Pass the indices to OpenGL.

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW)

	// Pass the texture to OpenGL.

	gl.activeTexture(gl.TEXTURE0)
	gl.bindTexture(gl.TEXTURE_2D, texture)
	gl.uniform1i(loc.uTexture, 0)

	// Pass the texture coordinates to OpenGL.

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ARRAY_BUFFER, sphere.uvs, gl.STATIC_DRAW)
	gl.vertexAttribPointer(loc.aTextureCoord, 2, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(loc.aTextureCoord)

	// Tell OpenGL to render the points.

	gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0)
}

export default renderSphere
