import { identity } from "@min-webgl/matrices"
import { POINT_F_SOURCE, POINT_V_SOURCE } from "../shaders"
import initShaderProgram from "./initShaderProgram"
import renderSpherePoints from "./renderSpherePoints"
import sphere from "./sphere"
import type { Mat4 } from "@min-webgl/matrices"
import * as m from "@min-webgl/matrices"

//
// We define some constants that describe the Earth ("Terra") and Moon
// ("Luna").
//
// Distance is measured in meters.
// Time is measured in seconds.
// Angles are measured in radians.
//

const TERRAN_RADIUS = 6371000
const TERRAN_DAY = 60 * 60 * 24
const TERRAN_AXIAL_TILT = 0.408407
const TERRAN_AXIS_OF_ROTATION: [number, number, number] = [
	Math.cos(TERRAN_AXIAL_TILT), 
	Math.sin(TERRAN_AXIAL_TILT),
	0
]
const TERRAN_TILT = m.rotate([0, -1, 0], 0.408407)

const LUNAR_RADIUS = 1737500
const LUNAR_DAY = 29.5 * TERRAN_DAY
const LUNAR_ORBIT_PERIOD = LUNAR_DAY
const LUNAR_DISTANCE = 384399000 

/**
 * Renders the Earth and Moon, using their real orbits/orientations.
 * 
 * @param gl The rendering context.
 * @param time The time in milliseconds.
 */
function renderSystem(gl: WebGLRenderingContext, time: number) {
	
	const spherePointsProgram = initShaderProgram(
		gl, POINT_V_SOURCE, POINT_F_SOURCE
	)
	if (spherePointsProgram == null) {
		return
	}
	const color = new Float32Array([0, 192 / 255, 1, 1.0])
	const planet = sphere(20)

	const aspectRatio = gl.canvas.width / gl.canvas.height

	const viewMatrix = m.concat(
		m.translate(0, 0, -10)
	)

	const perspectiveMatrix = m.perspective(
		Math.PI / 3,
		aspectRatio,
		1, 10
	)

	renderSpherePoints(
		gl,
		planet,
		color,
		spherePointsProgram,
		earthModelMatrix(time),
		viewMatrix,
		perspectiveMatrix
	)

	// !!! TODO
	// Try sketching out the problem and then implement it.
	// We can imagine the moon orbiting the earth on the xy plane,
	// then use the camera (view transformation) to change our
	// perspective.

}

/**
 * Creates a model matrix that will scale up a unit sphere to Earth's size,
 * and will also rotate it to match Earth's rotation at the given time.
 * 
 * @param time The time in milliseconds.
 */
function earthModelMatrix(time: number): Mat4 {
	return m.concat(
		m.rotate(TERRAN_AXIS_OF_ROTATION, time*1000/ 1000 / TERRAN_DAY),
		TERRAN_TILT,
		m.rotate([1, 0, 0], Math.PI / 2),
	)
}

export default renderSystem
