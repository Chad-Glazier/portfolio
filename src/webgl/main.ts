import State from "./State"
import clearCanvas from "./utils/clearCanvas";

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

	// Initialize the system state.

	const system = new State(gl)

	requestAnimationFrame(drawScene)
	function drawScene(now: number) {
		now *= 2
		system.render(now)
		requestAnimationFrame(drawScene)
	}
}

document.addEventListener("DOMContentLoaded", main);
