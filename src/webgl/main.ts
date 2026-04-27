import solarSystem from "./constants/solarSystem"
import renderSystem from "./renderSystem";
import {
	POINT_F_SOURCE,
	POINT_V_SOURCE,
	SPHERE_F_SOURCE,
	SPHERE_V_SOURCE,
} from "./shaders";
import clearCanvas from "./utils/clearCanvas";
import initShaderProgram from "./utils/initShaderProgram";
import lookAtObject from "./utils/lookAtObject"
import normalizeSystem from "./utils/normalizeSystem";

async function main() {
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
		console.error("Failed to load WebGL rendering context.")
		return;
	}

	clearCanvas(gl)
	gl.enable(gl.DEPTH_TEST)

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

	const solar = solarSystem(gl)
	const system = normalizeSystem(solar)

	requestAnimationFrame(drawScene)
	function drawScene(now: number) {
		now *= 2
		const camera = lookAtObject(4, system, "terra", now)
		clearCanvas(gl!);
		renderSystem(
			gl!,
			sphereProgram!,
			spherePointsProgram!,
			now,
			system,
			camera
		)
		requestAnimationFrame(drawScene)
	}
}



document.addEventListener("DOMContentLoaded", main);
