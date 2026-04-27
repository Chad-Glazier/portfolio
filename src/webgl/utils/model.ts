import * as m from "@min-webgl/matrices"
import type { Mat4 } from "@min-webgl/matrices"
import type { CelestialBody } from "./CelestialBody"
import position from "./position"

/**
 * Returns the model matrix for a celestial body.
 *
 * @param body
 * @param time The time, in seconds.
 * @returns
 */
function model(body: CelestialBody<any>, time: number): Mat4 {
	// Note: Each body is on the xz-plane.

	// Scale it up to match the radius.
	const model = m.scale(body.radius, body.radius, body.radius)

	// Orient it so that the "top" of the sphere is aligned with its north
	// pole.
	m.mult_i(m.rotate([1, 0, 0], Math.PI / 2), model)
	m.mult_i(m.rotate([0, 0, 1], -body.polarTilt), model)
	m.mult_i(m.rotate([0, 1, 0], -body.azimuthalTilt), model)

	// Rotate it about its axis.
	m.mult_i(m.rotate(
		[Math.sin(body.polarTilt), Math.cos(body.polarTilt), 0],
		body.initialRotation +
			2 * Math.PI * time / body.rotationPeriod,
	), model)

	// Rotate it to match its orbit.
	m.mult_i(m.translate(0, 0, -body.orbitalRadius), model);
	m.mult_i(m.rotate(
		[0, 1, 0],
		body.initialOrbitalRotation +
			2 * Math.PI * time / body.orbitalPeriod,
	), model);

	// Translate it to be centered around its orbital center instead of the
	// origin.
	if (Array.isArray(body.orbitalCenter)) {
		m.mult_i(
			m.translate(
				body.orbitalCenter[0],
				body.orbitalCenter[1],
				body.orbitalCenter[2],
			),
			model,
		);
	} else {
		const orbitalCenter = position(body.orbitalCenter, time);
		m.mult_i(
			m.translate(
				orbitalCenter[0],
				orbitalCenter[1],
				orbitalCenter[2],
			),
			model,
		);
	}

	return model;
}

export default model
