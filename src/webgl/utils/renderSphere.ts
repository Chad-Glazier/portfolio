import { flatten, type Mat4 } from "@min-webgl/matrices"
import type { Sphere } from "./sphere"
import type { CelestialBody } from "./CelestialBody"

let initialized = false;
function initialize(
	gl: WebGLRenderingContext,
	sphere: Sphere,
	program: WebGLProgram
) {
	const loc = {
		aVertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
		aTextureCoord: gl.getAttribLocation(program, "aTextureCoord"),
	}

	// Pass the vertices to OpenGL.

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ARRAY_BUFFER, sphere.vertices, gl.STATIC_DRAW)
	gl.vertexAttribPointer(loc.aVertexPosition, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(loc.aVertexPosition)

	// Pass the indices to OpenGL.

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW)

	// Pass the texture coordinates to OpenGL.

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
	gl.bufferData(gl.ARRAY_BUFFER, sphere.uvs, gl.STATIC_DRAW)
	gl.vertexAttribPointer(loc.aTextureCoord, 2, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(loc.aTextureCoord)
}

type Locations = {
    uModelMatrix: WebGLUniformLocation | null;
    uViewMatrix: WebGLUniformLocation | null;
    uProjectionMatrix: WebGLUniformLocation | null;
    uSphereCenter: WebGLUniformLocation | null;
    uLightPoint: WebGLUniformLocation | null;
    uTexture: WebGLUniformLocation | null;
}
const memo = new Map<CelestialBody<any>, Locations>()

function renderSphere(
	gl: WebGLRenderingContext,
	sphere: Sphere,
	program: WebGLProgram,
	model: Mat4,
	view: Mat4,
	projection: Mat4,
	body: CelestialBody<any>
): void {

	// Map the locations of different shader variables.

	if (!memo.get(body)) {
		memo.set(body, {
			uModelMatrix: gl.getUniformLocation(program, "uModelMatrix"),
			uViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
			uProjectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
			uSphereCenter: gl.getUniformLocation(program, "uSphereCenter"),
			uLightPoint: gl.getUniformLocation(program, "uLightPoint"),
			uTexture: gl.getUniformLocation(program, "uTexture")
		})
	}
	const loc = memo.get(body)!

	gl.useProgram(program)

	if (!initialized) {
		initialize(gl, sphere, program)
		initialized = true
	}

	// Pass constants to OpenGL.

	gl.uniform3fv(loc.uSphereCenter, new Float32Array([0, 0, 0]))
	gl.uniform3fv(loc.uLightPoint, new Float32Array([0, 0, 0]))

	// Pass the transformation matrices to OpenGL.

	gl.uniformMatrix4fv(loc.uModelMatrix, false, flatten(model))
	gl.uniformMatrix4fv(loc.uViewMatrix, false, flatten(view))
	gl.uniformMatrix4fv(loc.uProjectionMatrix, false, flatten(projection))

	// Pass the texture to OpenGL.

	gl.activeTexture(gl.TEXTURE0)
	gl.bindTexture(gl.TEXTURE_2D, body.texture())
	gl.uniform1i(loc.uTexture, 0)

	// Tell OpenGL to render the points.

	gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0)
}

export default renderSphere
