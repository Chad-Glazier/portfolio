import renderSpherePoints from "./renderSpherePoints"
import sphere from "./sphere"
import * as m from "@min-webgl/matrices"
import renderSphere from "./renderSphere"
import { model, type PlanetarySystem } from "./CelestialBody"
import { rgba } from "./constants/colors"

const view = m.concat(
	m.translate(0, 0, -100),
	m.rotate([1, 0, 0], Math.PI / 2),
)
const baseSphere = sphere(20)

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
	system: PlanetarySystem
) {
	const aspectRatio = gl.canvas.width / gl.canvas.height
	const perspectiveMatrix = m.perspective(
		Math.PI / 3,
		aspectRatio,
		1, 2e18
	)

	for (const body of system) {
		renderSphere(
			gl, 
			baseSphere,
			body.color ?? rgba(30, 30, 30, 1),
			sphereProgram,
			model(body, time / 1000),
			view,
			perspectiveMatrix
		)
		if (body.pointsColor) {
			renderSpherePoints(
				gl, 
				baseSphere,
				body.pointsColor,
				spherePointsProgram,
				model(body, time / 1000),
				view,
				perspectiveMatrix
			)			
		}
	}
}

export default renderSystem
