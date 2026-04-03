import { flatten, type Mat4 } from "@min-webgl/matrices"
import type { Sphere } from "./sphere"

function renderSpherePoints(
	gl: WebGLRenderingContext,
	sphere: Sphere,
	color: Float32Array,
	program: WebGLProgram,
	model: Mat4,
	view: Mat4,
	projection: Mat4
): void {

	// Map the locations of different shader variables.

	const loc = {
		aVertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
		uModelMatrix: gl.getUniformLocation(program, "uModelMatrix"),
		uViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
		uProjectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
		uColor: gl.getUniformLocation(program, "uColor")
	} 

	gl.useProgram(program)

	// Pass the transformation matrices to OpenGL.

	gl.uniformMatrix4fv(loc.uModelMatrix, false, flatten(model))
	gl.uniformMatrix4fv(loc.uViewMatrix, false, flatten(view))
	gl.uniformMatrix4fv(loc.uProjectionMatrix, false, flatten(projection))

	// Pass the vertices to OpenGL.

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.STATIC_DRAW)
	gl.vertexAttribPointer(loc.aVertexPosition, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(loc.aVertexPosition)

	// Pass the color to OpenGL

	gl.uniform4fv(loc.uColor, color)

	// Tell OpenGL to render the points.

	gl.drawArrays(gl.POINTS, 0, sphere.vertices.length / 3)

}

export default renderSpherePoints
