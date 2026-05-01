// function enableDragControls(): () => void {
// 	const canvas = game.config.renderingContext.canvas

// 	if (canvas instanceof OffscreenCanvas) {
// 		return
// 	}

// 	let dragging = false
// 	let initialPosition = [0, 0]
// 	let initialTime = 0
// 	let lastRPM = 0
// 	let lastAxis = [0, 0, 0]

// 	canvas.addEventListener("mousedown", ev => {
// 		if (game.isPaused) return
// 		if (ev.button !== 1) return // ensure it's clicking the mousewheel

// 		dragging = true
// 		initialTime = Date.now()

// 		game.setMomentum([0, 0, 1], 0)
// 	})

// 	canvas.addEventListener("mousemove", ({ movementX, movementY }) => {
// 		if (game.isPaused) return
// 		if (!dragging) return

// 		const canvasLength = Math.max(canvas.clientWidth, canvas.clientHeight)

// 		// We calculate the displacement of the mouse.
// 		const [initialX, initialY] = initialPosition
// 		const [deltaX, deltaY] = [
// 			movementX,
// 			-1 * movementY,
// 		]
// 		const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
// 		if (magnitude === 0) return

// 		// By default, there is one half of a rotation per length of the canvas
// 		// dragged. The sensitivity setting is also factored in.
// 		const rotations = game.dragSensitivity * magnitude /
// 			(2 * canvasLength) * game.mouseSensitivityMultiplier

// 		// The axis of rotation ought to be orthogonal to the displacement
// 		// of the mouse in order to feel natural. It's magnitude is irrelevant.
// 		// Since we know that `deltaY` and `deltaX` are never both zero,
// 		// otherwise the "mousemove" event wouldn't be emitted in the first
// 		// place, this should work.
// 		const axisOfRotation = [-1 * deltaY, deltaX, 0]

// 		// Finally, we apply the rotation.
// 		game.applyRotation(axisOfRotation, rotations * 360)

// 		// Adjust the outer variables.
// 		const minutes = (Date.now() - initialTime) / 1000 / 60
// 		lastAxis = axisOfRotation
// 		lastRPM = rotations / minutes
// 		if (lastRPM == Infinity) lastRPM = 0
// 		initialTime = Date.now()
// 	})

// 	canvas.addEventListener("mouseup", ev => {
// 		if (!dragging) return
// 		if (ev.button !== 1) return // ensure it's clicking the mousewheel

// 		dragging = false
// 		game.setInertia(lastAxis, lastRPM)
// 	})

// 	canvas.addEventListener("mouseleave", () => {
// 		if (!dragging) return

// 		dragging = false
// 		game.setInertia(lastAxis, lastRPM)
// 	})
// }

// export default enableDragControls
