import type { Point } from "@min-webgl/matrices"
import type { PlanetarySystem } from "./CelestialBody"
import lookAt from "./lookAt"
import position from "./position"

/**
 * 
 * 
 * @param distance The distance away from the object's surface as a multiple of
 * the celestial body's radius. I.e., a distance of `0` would be right on the
 * surface, while a distance of `1` would be at a height equal to the radius
 * of the body.
 * @param object The celestial body to look at.
 * @param time The current time, in seconds. This is necessary to calculate the
 * position of the object.
 */
function lookAtObject<ObjectName extends string>(
	distance: number, 
	system: PlanetarySystem<ObjectName>, 
	objectName: ObjectName, 
	time: number,
	horizontalOffset: number = 2
) {

	const object = system.find(object => object.name == objectName)
	const objectPosition = position(object!, time)

	const cameraPosition: Point = 
		[objectPosition[0], objectPosition[1], objectPosition[2], 1]
	
	const angle = Math.PI / 24
	const dist = (distance + 1) * object!.radius
	const y = dist * Math.sin(angle)
	const z = dist * Math.cos(angle)

	cameraPosition[1] += y
	cameraPosition[2] += z

	objectPosition[0] -= horizontalOffset * object!.radius

	return lookAt(
		cameraPosition,
		objectPosition,
		[ 0, 1, 0, 0 ]
	)
}

export default lookAtObject
