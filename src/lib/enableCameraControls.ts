import getSystem from "../webgl"
import type State from "../webgl/State"
import clamp from "./clamp"
import sleep from "./sleep"

// A factor that determines how sensitive the rotation speed is to movements.
const SENSIVITY_FACTOR = 0.02
// A factor that adjusts the RPM for inertial movements (i.e., the movement
// that occurs after the sphere has been "released.")
const INTERTIA_SENSITIVITY_FACTOR = 0.20
// The coefficient of friction; i.e., how quickly the sphere loses its 
// momentum.
const COEFFICIENT_OF_FRICTION = 0.05
// A hard limit on the vertical angle that the camera can have relative to the
// body it's focused on and the horizontal axis. This is put in place because
// it's kind of disorienting if the camera can do full somersaults. This value
// should be in the interval [0, π/2].
const VERTICAL_CAMERA_ANGLE_BOUND = Math.PI / 4

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

    const verticalDelta = 2 * Math.PI * rotations * movementY
    const horizontalDelta = 2 * Math.PI * rotations * movementX

	state.system!.cameraOptions.verticalAngle += verticalDelta    
    state.system!.cameraOptions.horizontalAngle -= horizontalDelta

    state.system!.cameraOptions.verticalAngle = clamp(
        -VERTICAL_CAMERA_ANGLE_BOUND,
        state.system!.cameraOptions.verticalAngle,
        VERTICAL_CAMERA_ANGLE_BOUND,
    )
	
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
        let rotations = minutesElapsed * state.lastRPM

        rotations *= INTERTIA_SENSITIVITY_FACTOR

        const verticalDelta = 2 * Math.PI * rotations * state.lastAxis[0]
        const horizontalDelta = 2 * Math.PI * rotations * state.lastAxis[1]

        state.system!.cameraOptions.verticalAngle += verticalDelta    
        state.system!.cameraOptions.horizontalAngle -= horizontalDelta

        state.system!.cameraOptions.verticalAngle = clamp(
            -VERTICAL_CAMERA_ANGLE_BOUND,
            state.system!.cameraOptions.verticalAngle,
            VERTICAL_CAMERA_ANGLE_BOUND,
        )

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
