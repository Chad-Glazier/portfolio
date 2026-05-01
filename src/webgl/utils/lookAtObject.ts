import type { PlanetarySystem } from "./CelestialBody"
import * as m from "@min-webgl/matrices"
import position from "./position"

export type CameraOptions = {
	horizontalOffset: number
	verticalOffset: number
	horizontalAngle: number
	verticalAngle: number
	distance: number
}

/**
 * Returns a view matrix that looks at a specific object with the specified
 * options.
 * 
 * @param system The system containing the celestial body to look at.
 * @param object The name of the celestial body to look at.
 * @param time The current time, in seconds. This is necessary to calculate the
 * position of the object.
 * @param options The options for the camera, including the distance from it,
 * rotations, etc. All distances are multiples of the object's radius.
 */
function lookAtObject<ObjectName extends string>(
	system: PlanetarySystem<ObjectName>, 
	objectName: ObjectName, 
	time: number,
	options: Partial<CameraOptions> = {
		distance: 4,
		horizontalAngle: 0,
		verticalAngle: 0,
		horizontalOffset: 0,
		verticalOffset: 0,
	}
): m.Mat4 {
	let distance = options.distance ?? 4
	const horizontalAngle = options.horizontalAngle ?? 0
	const verticalAngle = options.verticalAngle ?? 0
	let horizontalOffset = options.horizontalOffset ?? 0
	let verticalOffset = options.verticalOffset ?? 0

	const object = system.find(object => object.name == objectName)

	if (!object) {
		throw new Error(`Error: "${objectName}" not found in the system.`)
	}

	const objectPosition = position(object, time)

	horizontalOffset *= object.radius
	verticalOffset *= object.radius
	distance *= object.radius
	
	return m.concat(
		m.translate(
			horizontalOffset,
			verticalOffset,
			0
		),
		m.translate(0, 0, -distance),
		m.rotate([1, 0, 0], verticalAngle),
		m.rotate([0, 1, 0], -horizontalAngle),
		m.translate(
			-objectPosition[0], 
			-objectPosition[1], 
			-objectPosition[2]
		),
	)
}

export default lookAtObject
