import * as m from "@min-webgl/matrices";
import { model, type PlanetarySystem } from "./utils/CelestialBody";
import renderSphere from "./utils/renderSphere";
import renderSpherePoints from "./utils/renderSpherePoints";
import sphere from "./utils/sphere";

const baseSphere = sphere(40);

/**
 * Renders a planetary system.
 *
 * @param gl The rendering context.
 * @param time The time in seconds.
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
	const projection = m.perspective(
		Math.PI / 4,
		aspectRatio,
		0.00001,
		100,
	);

	for (const body of system) {
		renderSphere(
			gl,
			baseSphere,
			sphereProgram,
			model(body, time),
			view,
			projection,
			body
		);
		if (body.pointsColor) {
			renderSpherePoints(
				gl,
				baseSphere,
				body.pointsColor,
				spherePointsProgram,
				model(body, time),
				view,
				projection,
			);
		}
	}
}

export default renderSystem;
