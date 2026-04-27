import * as m from "@min-webgl/matrices"
import type { Point } from "@min-webgl/matrices"
import type { CelestialBody } from "./CelestialBody"

/**
 * Returns the point position of a celestial body (that is, its center) at a
 * given time.
 */
function position(body: CelestialBody<any>, time: number): Point {
	const model = m.translate(0, 0, -body.orbitalRadius);
	m.mult_i(m.rotate(
		[0, 1, 0],
		body.initialOrbitalRotation +
			2 * Math.PI * time / body.orbitalPeriod,
	), model);
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
	return m.transform(model, [0, 0, 0, 1]);
}

export default position
