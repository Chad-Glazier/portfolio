import type { PlanetarySystem } from "./CelestialBody";

/**
 * "Normalizes" a planetary system, making it so that the entire thing has a
 * radius of 1 and the sizes are scaled to be easier to visualize.
 *
 * @param system The system to normalize.
 */
function normalizeSystem(system: PlanetarySystem): PlanetarySystem {

	const copy: PlanetarySystem = system.map(body => {
		return { ...body }
	})
	copy.forEach(body => {
		if (!Array.isArray(body.orbitalCenter)) {
			const idx = system.indexOf(body.orbitalCenter)
			body.orbitalCenter = copy[idx]
		}
	})

	copy.forEach((body) => {
		body.radius = Math.pow(body.radius, 0.5);
		body.orbitalRadius = Math.pow(body.orbitalRadius, 0.5);
	});

	const maxOrbitalRadius = copy
		.map((body) => body.orbitalRadius)
		.reduce((a, b) => Math.max(a, b));

	copy.forEach((body) => {
		body.orbitalRadius /= maxOrbitalRadius;
		body.radius /= maxOrbitalRadius;
	});

	return copy
}

export default normalizeSystem;
