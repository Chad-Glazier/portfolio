import * as m from "@min-webgl/matrices";
import { model, type PlanetarySystem } from "./CelestialBody";
import { rgba } from "./webgl_utils/colors";
import renderSphere from "./webgl_utils/renderSphere";
import renderSpherePoints from "./webgl_utils/renderSpherePoints";
import sphere from "./webgl_utils/sphere";

const view = m.concat(
	m.translate(0, 0, -1.5),
	m.rotate([1, 0, 0], Math.PI / 6),
);
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
