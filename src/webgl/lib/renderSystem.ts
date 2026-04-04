import renderSpherePoints from "./renderSpherePoints"
import sphere from "./sphere"
import type { Mat4 } from "@min-webgl/matrices"
import * as m from "@min-webgl/matrices"
import renderSphere from "./renderSphere"
import { model, type CelestialBody } from "./CelestialBody"

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
	Math.sin(TERRAN_AXIAL_TILT), 
	0,
	Math.cos(TERRAN_AXIAL_TILT),
]

const LUNAR_RADIUS = 1737500
const LUNAR_DAY = 29.5 * TERRAN_DAY
const LUNAR_ORBIT_PERIOD = LUNAR_DAY
const LUNAR_DISTANCE = 384399000 

//
// TODO:
// implement directional lighting from the "sun"
//

/**
 * Renders the Earth and Moon, using their real orbits/orientations.
 * 
 * @param gl The rendering context.
 * @param time The time in milliseconds.
 */
function renderSystem(
	gl: WebGLRenderingContext, 
	sphereProgram: WebGLProgram,
	spherePointsProgram: WebGLProgram,
	time: number,
) {
	const aspectRatio = gl.canvas.width / gl.canvas.height

	const viewMatrix = m.concat(
		m.translate(0, 0, -10),
		// m.rotate([1, 0, 0], 2 * Math.PI / 3),
	)

	const perspectiveMatrix = m.perspective(
		Math.PI / 3,
		aspectRatio,
		0.1, 100
	)

	const black = new Float32Array([0, 0, 0, 1])
	const gray = new Float32Array([0.05, 0.05, 0.05, 1.0])
	const blue = new Float32Array([0, 75 / 255, 200 / 255, 1])
	const white = new Float32Array([1, 1, 1, 1])

	const earth = sphere(30)
	const moon = sphere(12)

	renderSpherePoints(
		gl,
		earth,
		white,
		spherePointsProgram,
		earthModelMatrix(time),
		viewMatrix,
		perspectiveMatrix
	)

	renderSphere(
		gl,
		earth,
		gray,
		sphereProgram,
		earthModelMatrix(time),
		viewMatrix,
		perspectiveMatrix
	)

	renderSpherePoints(
		gl,
		moon,
		white,
		spherePointsProgram,
		moonModelMatrix(time),
		viewMatrix,
		perspectiveMatrix
	)

	renderSphere(
		gl,
		moon,
		gray,
		sphereProgram,
		moonModelMatrix(time),
		viewMatrix,
		perspectiveMatrix
	)
}

/**
 * Creates a model matrix that will scale up a unit sphere to Earth's size,
 * and will also rotate it to match Earth's rotation at the given time.
 * 
 * @param time The time in milliseconds.
 */
function earthModelMatrix(time: number): Mat4 {
	return m.concat(
		m.rotate(TERRAN_AXIS_OF_ROTATION, time / 1000 / TERRAN_DAY),
		m.rotate([0, 1, 0], TERRAN_AXIAL_TILT),
	)
}

const moon: CelestialBody = {
	radius: 0.25,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: LUNAR_DAY,
	orbitalCenter: [0, 0, 0],
	orbitalRadius: 6,
	orbitalPeriod: LUNAR_ORBIT_PERIOD,
	initialRotation: 0,
	initialOrbitalRotation: 0
}

function moonModelMatrix(time: number): Mat4 {
	return model(moon, time / 1000)
	// return m.concat(
	// 	m.rotate([0, 0, 1], time / 1000 / LUNAR_ORBIT_PERIOD * 2 * Math.PI),
	// 	m.translate(0, 6, 0),
	// 	m.rotate([0, 0, 1], time / 1000 / LUNAR_DAY * 2 * Math.PI),
	// 	m.scale(0.25, 0.25, 0.25),
	// )
}

export default renderSystem
