import type { Mat4 } from "@min-webgl/matrices"
import solarSystem, { type SolarObject } from "./constants/solarSystem"
import type { PlanetarySystem } from "./utils/CelestialBody"
import lookAtObject from "./utils/lookAtObject"
import normalizeSystem from "./utils/normalizeSystem"
import clearCanvas from "./utils/clearCanvas"
import renderSystem from "./renderSystem"
import initShaderProgram from "./utils/initShaderProgram"
import { 
	POINT_F_SOURCE, POINT_V_SOURCE, 
	SPHERE_F_SOURCE, SPHERE_V_SOURCE 
} from "./shaders"

type Camera = (time: number) => Mat4

class State {
	private gl: WebGLRenderingContext
	private system: PlanetarySystem<SolarObject>
	private focus: SolarObject
	private camera: Camera
	private program: {
		sphere: WebGLProgram
		spherePoints: WebGLProgram
	}

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl
		this.system = normalizeSystem(solarSystem(gl))
		this.focus = "terra"
		this.camera = (time) => lookAtObject(4, this.system, this.focus, time)
		
		const spherePointsProgram = initShaderProgram(
			gl,
			POINT_V_SOURCE,
			POINT_F_SOURCE,
		)

		const sphereProgram = initShaderProgram(
			gl,
			SPHERE_V_SOURCE,
			SPHERE_F_SOURCE,
		)

		if (spherePointsProgram == null || sphereProgram == null) {
			throw new Error("Error compiling shaders")
		}

		this.program = {
			sphere: sphereProgram,
			spherePoints: spherePointsProgram
		}		
	}

	setFocus(object: SolarObject) {
		this.focus = object
	}

	render(time: number) {
		clearCanvas(this.gl)
		renderSystem(
			this.gl,
			this.program.sphere,
			this.program.spherePoints,
			time,
			this.system,
			this.camera(time)
		)
	}
}

export default State
