import * as m from "@min-webgl/matrices"

function main() {
	const root = document.getElementById("webgl-root")

	if (root == null || !(root instanceof HTMLCanvasElement)) {
		console.error(
			"WebGL entrypoint not found.\n" +
			"Expected an element like <canvas id=\"webgl-root\"></canvas>"
		)
		return
	}

	const gl = root.getContext("webgl")

	
}

document.addEventListener("DOMContentLoaded", main)
