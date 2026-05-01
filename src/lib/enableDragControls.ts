import type State from "../webgl/State"

const SENSIVITY_FACTOR = 0.5

const state: {
	dragging: boolean
	initialTime: number
	lastRPM: number
	lastAxis: number[]
	system: State | null
} = {
	dragging: false,
	initialTime: 0,
	lastRPM: 0,
	lastAxis: [0, 0, 0],
	system: null
}

function mousedown(ev: MouseEvent) {
	if (ev.button !== 0) return // ensure it's a left-click

	state.dragging = true
	state.initialTime = Date.now()
}

function mousemove({ movementX, movementY }: MouseEvent) {
	if (!state.dragging) return

	const windowLength = Math.max(window.innerWidth, window.innerHeight)

	const magnitude = Math.sqrt(
		movementX * movementX + movementY * movementY
	)
	if (magnitude === 0) return

	const rotations = SENSIVITY_FACTOR * magnitude / windowLength

	// The axis of rotation ought to be orthogonal to the displacement
	// of the mouse in order to feel natural. It's magnitude is irrelevant.
	// Since we know that delta Y and delta X are never both zero,
	// otherwise the "mousemove" event wouldn't be emitted in the first
	// place, this should work.
	const axisOfRotation = [movementY, movementX, 0]

	state.system!.cameraOptions.verticalAngle += 
		2 * Math.PI * rotations * movementY / magnitude
	state.system!.cameraOptions.horizontalAngle -=
		2 * Math.PI * rotations * movementX / magnitude

	// Adjust the outer variables.
	const minutes = (Date.now() - state.initialTime) / 1000 / 60
	state.lastAxis = axisOfRotation
	state.lastRPM = rotations / minutes
	if (state.lastRPM == Infinity) state.lastRPM = 0
	state.initialTime = Date.now()
}

function mouseup(ev: MouseEvent) {
	if (!state.dragging) return
	if (ev.button !== 0) return // ensure it's clicking the mousewheel

	state.dragging = false
}

function mouseleave() {
	if (!state.dragging) return

	state.dragging = false
}

function enableDragControls(system: State): () => void {

	state.system = system

	document.addEventListener("mousedown", mousedown)
	document.addEventListener("mousemove", mousemove)
	document.addEventListener("mouseup", mouseup)
	document.addEventListener("mouseleave", mouseleave)

	return () => {
		document.removeEventListener("mousedown", mousedown)
		document.removeEventListener("mousemove", mousemove)
		document.removeEventListener("mouseup", mouseup)
		document.removeEventListener("mouseleave", mouseleave)
	}
}

export default enableDragControls
