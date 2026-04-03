import clearCanvas from "./lib/clearCanvas"
import renderSystem from "./lib/renderSystem"

function main() {
	const root = document.getElementById("webgl-root")

	if (root == null || !(root instanceof HTMLCanvasElement)) {
		console.error(
			"WebGL entrypoint not found. Expected an element like <canvas id=\"webgl-root\"></canvas>"
		)
		return
	}

	root.width = root.clientWidth
	root.height = root.clientHeight
	
	const gl = root.getContext("webgl")
	if (gl == null) {
		console.error("Failed to load WebGL rendering context.")
		return
	}

	clearCanvas(gl)

	// Draw the system

	renderSystem(gl, Date.now())
}

document.addEventListener("DOMContentLoaded", main)
