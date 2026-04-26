import * as m from "@min-webgl/matrices";
import { model, type PlanetarySystem } from "./utils/CelestialBody";
import { rgba } from "./utils/colors";
import renderSphere from "./utils/renderSphere";
import renderSpherePoints from "./utils/renderSpherePoints";
import sphere from "./utils/sphere";

const baseSphere = sphere(20);

/**
 * Renders a planetary system.
 *
 * @param gl The rendering context.
 * @param time The time in milliseconds.
 */
function renderSystem(
	gl: WebGLRenderingContext,
	sphereProgram: WebGLProgram,
	spherePointsProgram: WebGLProgram,
	time: number,
	system: PlanetarySystem,
	view: m.Mat4,
) {
	const aspectRatio = gl.canvas.width / gl.canvas.height;
	const perspectiveMatrix = m.perspective(
		Math.PI / 4,
		aspectRatio,
		0.1,
		3,
	);

	for (const body of system) {
		renderSphere(
			gl,
			baseSphere,
			body.color ?? rgba(30, 30, 30, 1),
			sphereProgram,
			model(body, time / 1000),
			view,
			perspectiveMatrix,
		);
		if (body.pointsColor) {
			renderSpherePoints(
				gl,
				baseSphere,
				body.pointsColor,
				spherePointsProgram,
				model(body, time / 1000),
				view,
				perspectiveMatrix,
			);
		}
	}
}

export default renderSystem;
