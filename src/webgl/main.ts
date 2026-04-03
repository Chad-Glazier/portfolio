import { identity, perspective, translate, concat, rotate } from "@min-webgl/matrices"
import initShaderProgram from "./lib/initShaderProgram"
import renderSpherePoints from "./lib/renderSpherePoints"
import sphere from "./lib/sphere"
import { POINT_F_SOURCE, POINT_V_SOURCE } from "./shaders"

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
	
	const ASPECT_RATIO = root.width / root.height

	const gl = root.getContext("webgl")
	if (gl == null) {
		console.error("Failed to load WebGL rendering context.")
		return
	}

	// Clear the canvas
	
	gl.clearColor(0, 0, 0, 1)
	gl.clearDepth(1.0)
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)


	// Draw a sphere

	const spherePointsProgram = initShaderProgram(
		gl, POINT_V_SOURCE, POINT_F_SOURCE
	)
	if (spherePointsProgram == null) {
		return
	}
	const color = new Float32Array([1.0, 0.0, 0.0, 1.0])
	const planet = sphere(10)

	renderSpherePoints(
		gl,
		planet,
		color,
		spherePointsProgram,
		identity(4),
		concat(
			translate(0, 0, -3),
			rotate([1, 0, 0], Math.PI/2.4),
		),
		perspective(Math.PI / 3, ASPECT_RATIO, 1, 10)
	)
}

document.addEventListener("DOMContentLoaded", main)
