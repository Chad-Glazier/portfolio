import getSystem from "../webgl"
import type State from "../webgl/State"
import sleep from "./sleep"

const SENSIVITY_FACTOR = 0.02
const COEFFICIENT_OF_FRICTION = 0.05

const state: {
	dragging: boolean
	initialTime: number
	lastRPM: number
	lastAxis: number[]
	system: State | null
    inertiaUpdate: number | null
} = {
	dragging: false,
	initialTime: 0,
	lastRPM: 0,
	lastAxis: [0, 0, 0],
	system: null,
    inertiaUpdate: null
}

function mousedown(ev: MouseEvent) {
	if (ev.button !== 0) return // ensure it's a left-click

	state.dragging = true
	state.initialTime = Date.now()
    clearInterval(state.inertiaUpdate ?? undefined)
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
		2 * Math.PI * rotations * movementY
	state.system!.cameraOptions.horizontalAngle -=
		2 * Math.PI * rotations * movementX

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

    const elapsed = 1000 / 60
    const interval = setInterval(() => {
        if (state.lastRPM <= 0.001) {
            clearInterval(interval)
            return
        }
        const minutesElapsed = interval / 1000 / 60
        const rotations = minutesElapsed * state.lastRPM

        state.system!.cameraOptions.verticalAngle +=
            2 * Math.PI * rotations * state.lastAxis[0]
        state.system!.cameraOptions.horizontalAngle -=
            2 * Math.PI * rotations * state.lastAxis[1]

        state.lastRPM *= 1 - COEFFICIENT_OF_FRICTION

    }, elapsed)

    state.inertiaUpdate = interval
}

function mouseleave() {
	if (!state.dragging) return

	state.dragging = false
}

function wheel(ev: WheelEvent) {

	const distance = ev.deltaY / 300

	state.system!.cameraOptions.distance = Math.min(
		Math.max(3, state.system!.cameraOptions.distance + distance),
		30
	) 
}

export async function enableCameraControls() {

    // If the state (i.e., the global state object that manages the controls)
    // does not yet have a reference to the system, then we periodically try
    // to get such a reference. This is necessary because the visual system
    // requires some setup that happens asynchronously. 
    while (state.system === null) {
        await sleep(100)
        state.system = getSystem()
    }

	document.addEventListener("mousedown", mousedown)
	document.addEventListener("mousemove", mousemove)
	document.addEventListener("mouseup", mouseup)
	document.addEventListener("mouseleave", mouseleave)
	document.addEventListener("wheel", wheel)
}

export function disableCameraControls() {

    if (state.system === null) { 
        return
    }

	document.removeEventListener("mousedown", mousedown)
	document.removeEventListener("mousemove", mousemove)
	document.removeEventListener("mouseup", mouseup)
	document.removeEventListener("mouseleave", mouseleave)
	document.removeEventListener("wheel", wheel)
}
