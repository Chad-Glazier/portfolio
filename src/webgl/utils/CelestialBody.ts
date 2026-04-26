import type { Mat4, Point } from "@min-webgl/matrices";
import {
	identity,
	mult_i,
	rotate,
	scale,
	transform,
	translate,
} from "@min-webgl/matrices";

/**
 * Represents a celestial body. For example, a star, a planet, or a moon.
 */
export type CelestialBody = {
	/** The unique name of the body. */
	name: string;
	/** (km) The radius of the body. */
	radius: number;
	/** (rad) The angle between the body's axis of rotation and the y axis. */
	polarTilt: number;
	/** (rad) The angle of rotation about the y-axis. */
	azimuthalTilt: number;
	/** (s) The time it takes for the object to make one full rotation. */
	rotationPeriod: number;

	/** The point that this object is orbiting. */
	orbitalCenter: Point | CelestialBody;
	/** (km) The distance between this object and its orbital center. */
	orbitalRadius: number;
	/** (s) The time it takes for this object to complete one full orbit. */
	orbitalPeriod: number;

	/** (rad) The initial rotation of the object. */
	initialRotation: number;
	/** (rad) The initial orbital rotation of the object. */
	initialOrbitalRotation: number;

	/** The color of the points to render on the sphere. */
	pointsColor?: Float32Array;
	/** The texture for the sphere */
	texture: WebGLTexture
};

/**
 * Represents a planetary system i.e., a system of celestial bodies including
 * a star and some number of planets and moons.
 */
export type PlanetarySystem = CelestialBody[];

/**
 * Returns the model matrix for a celestial body.
 *
 * @param body
 * @param time The time, in seconds.
 * @returns
 */
export function model(body: CelestialBody, time: number): Mat4 {
	// Note: Each body is on the xz-plane.

	const model = identity(4);

	// Scale it up to match the radius.
	mult_i(scale(body.radius, body.radius, body.radius), model);

	// Orient it so that the "top" of the sphere is aligned with its north
	// pole.
	mult_i(rotate([1, 0, 0], Math.PI / 2), model);
	mult_i(rotate([0, 0, 1], -body.polarTilt), model);
	mult_i(rotate([0, 1, 0], -body.azimuthalTilt), model);

	// Rotate it about its axis.
	const axialRotation = rotate(
		[Math.sin(body.polarTilt), Math.cos(body.polarTilt), 0],
		body.initialRotation +
			2 * Math.PI * time / body.rotationPeriod,
	);
	mult_i(axialRotation, model);

	// Rotate it to match its orbit.
	mult_i(translate(0, 0, -body.orbitalRadius), model);
	const orbitalRotation = rotate(
		[0, 1, 0],
		body.initialOrbitalRotation +
			2 * Math.PI * time / body.orbitalPeriod,
	);
	mult_i(orbitalRotation, model);

	// Translate it to be centered around its orbital center instead of the
	// origin.
	if (Array.isArray(body.orbitalCenter)) {
		mult_i(
			translate(
				body.orbitalCenter[0],
				body.orbitalCenter[1],
				body.orbitalCenter[2],
			),
			model,
		);
	} else {
		const orbitalCenter = position(body.orbitalCenter, time);
		mult_i(
			translate(
				orbitalCenter[0],
				orbitalCenter[1],
				orbitalCenter[2],
			),
			model,
		);
	}

	return model;
}

/**
 * Returns the point position of a celestial body (that is, its center) at a
 * given time.
 */
export function position(body: CelestialBody, time: number): Point {
	const model = translate(0, 0, -body.orbitalRadius);
	const orbitalRotation = rotate(
		[0, 1, 0],
		body.initialOrbitalRotation +
			2 * Math.PI * time / body.orbitalPeriod,
	);
	mult_i(orbitalRotation, model);
	if (Array.isArray(body.orbitalCenter)) {
		mult_i(
			translate(
				body.orbitalCenter[0],
				body.orbitalCenter[1],
				body.orbitalCenter[2],
			),
			model,
		);
	} else {
		const orbitalCenter = position(body.orbitalCenter, time);
		mult_i(
			translate(
				orbitalCenter[0],
				orbitalCenter[1],
				orbitalCenter[2],
			),
			model,
		);
	}
	return transform(model, [0, 0, 0, 1]);
}
