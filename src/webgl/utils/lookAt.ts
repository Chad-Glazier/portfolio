import { cross, dot, mult_i, normalize, sub } from "@min-webgl/matrices"
import type { Mat4, Point, Vec } from "@min-webgl/matrices"

/**
 * Computes a view matrix from the standard "lookAt" parameters.
 * 
 * @param eye The position of the camera in world space.
 * @param look The point that the camera is facing.
 * @param up The "up" direction.
 * @returns A view matrix.
 */
function lookAt(eye: Point, look: Point, up: Vec): Mat4 {
	const zAxis = normalize(sub(look, eye))
	const xAxis = normalize(cross(zAxis, up))
	const yAxis = cross(xAxis, zAxis)

	mult_i(-1, zAxis)

	return [
		[ xAxis[0], xAxis[1], xAxis[2], -dot(xAxis, eye) ],
		[ yAxis[0], yAxis[1], yAxis[2], -dot(yAxis, eye) ],
		[ zAxis[0], zAxis[1], zAxis[2], -dot(zAxis, eye) ],
		[        0,        0,        0,                1 ]
	]
}

export default lookAt
