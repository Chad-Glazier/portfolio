import { identity, mult_i, rotate, scale, translate, type Mat4 } from "@min-webgl/matrices"

type Vec3 = [x: number, y: number, z: number]
type Point = Vec3

export type CelestialBody = {
	
	/** (km) The radius of the body. */
	radius: number
	/** (rad) The angle between the body's axis of rotation and the z axis. */
	polarTilt: number
	/** (rad) The angle of rotation about the z-axis. */
	azimuthalTilt: number
	/** (s) The time it takes for the object to make one full rotation. */
	rotationPeriod: number
	
	/** (km) The point that this object is orbiting. */
	orbitalCenter: Point
	/** (km) The distance between this object and its orbital center. */
	orbitalRadius: number
	/** (s) The time it takes for this object to complete one full orbit. */
	orbitalPeriod: number

	/** (rad) The initial rotation of the object. */
	initialRotation: number
	/** (rad) The initial orbital rotation of the object. */
	initialOrbitalRotation: number

}

export function model(body: CelestialBody, time: number): Mat4 {

	//
	// Note: Each body is on the xz-plane.
	//

	const model = identity(4)

	//
	// Scale it up to match the radius.
	//

	mult_i(scale(body.radius, body.radius, body.radius), model)

	// 
	// Rotate it about its axis.
	//

	const axialRotation = rotate(
		[Math.sin(body.polarTilt), 0, Math.cos(body.polarTilt)], 
		body.initialRotation + 
			2 * Math.PI * time / body.rotationPeriod
	)
	mult_i(axialRotation, model)

	// 
	// Rotate it to match its orbit.
	//

	mult_i(translate(0, 0, -body.orbitalRadius), model)
	const orbitalRotation = rotate(
		[0, 1, 0],
		body.initialOrbitalRotation +
			2 * Math.PI * time / body.orbitalPeriod
	)
	mult_i(orbitalRotation, model)


	//
	// translate it to be centered around its orbital center.
	//

	mult_i(
		translate(...body.orbitalCenter),
		model
	)

	return model
}
