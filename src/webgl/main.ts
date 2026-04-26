import solarSystem from "./constants/solarSystem";
import renderSystem from "./renderSystem";
import {
	POINT_F_SOURCE,
	POINT_V_SOURCE,
	SPHERE_F_SOURCE,
	SPHERE_V_SOURCE,
} from "./shaders";
import clearCanvas from "./utils/clearCanvas";
import initShaderProgram from "./utils/initShaderProgram";
import lookAt from "./utils/lookAt";
import normalizeSystem from "./utils/normalizeSystem";

function main() {
	const root = document.getElementById("webgl-root");

	if (root == null || !(root instanceof HTMLCanvasElement)) {
		console.error(
			'WebGL entrypoint not found. Expected an element like <canvas id="webgl-root"></canvas>',
		);
		return;
	}

	root.width = root.clientWidth;
	root.height = root.clientHeight;

	const gl = root.getContext("webgl");
	if (gl == null) {
		console.error("Failed to load WebGL rendering context.");
		return;
	}

	clearCanvas(gl);
	gl.enable(gl.DEPTH_TEST);

	// Draw the system

	const spherePointsProgram = initShaderProgram(
		gl,
		POINT_V_SOURCE,
		POINT_F_SOURCE,
	);
	if (spherePointsProgram == null) {
		return;
	}

	const sphereProgram = initShaderProgram(
		gl,
		SPHERE_V_SOURCE,
		SPHERE_F_SOURCE,
	);
	if (sphereProgram == null) {
		return;
	}
	normalizeSystem(solarSystem);

	setInterval(() => {
		clearCanvas(gl);
		renderSystem(
			gl,
			sphereProgram,
			spherePointsProgram,
			Date.now() * 100000,
			solarSystem,
			lookAt(
				[0, 1, 0, 1],
				[0, 0, 0, 1],
				[0, 0, 1, 0],
			),
		);
	}, 1000 / 30);
}

document.addEventListener("DOMContentLoaded", main);
