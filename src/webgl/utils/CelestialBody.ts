import type { Point } from "@min-webgl/matrices"

/**
 * Represents a celestial body. For example, a star, a planet, or a moon.
 */
export type CelestialBody<ObjectName extends string> = {
	/** The unique name of the body. */
	name: ObjectName
	/** (km) The radius of the body. */
	radius: number
	/** (rad) The angle between the body's axis of rotation and the y axis. */
	polarTilt: number
	/** (rad) The angle of rotation about the y-axis. */
	azimuthalTilt: number
	/** (s) The time it takes for the object to make one full rotation. */
	rotationPeriod: number

	/** The point that this object is orbiting. */
	orbitalCenter: Point | CelestialBody<ObjectName>
	/** (km) The distance between this object and its orbital center. */
	orbitalRadius: number
	/** (s) The time it takes for this object to complete one full orbit. */
	orbitalPeriod: number

	/** (rad) The initial rotation of the object. */
	initialRotation: number
	/** (rad) The initial orbital rotation of the object. */
	initialOrbitalRotation: number

	/** The color of the points to render on the sphere. */
	pointsColor?: Float32Array

	/** The texture for the sphere */
	texture: () => WebGLTexture
}

/**
 * Represents a planetary system i.e., a system of celestial bodies including
 * a star and some number of planets and moons.
 */
export type PlanetarySystem<ObjectName extends string> =
	CelestialBody<ObjectName>[]

