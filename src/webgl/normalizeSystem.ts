import type { PlanetarySystem } from "./CelestialBody";
import { sol } from "./constants/solarSystem";

/**
 * "Normalizes" a planetary system, making it so that the entire thing has a
 * radius of 1 and the sizes are scaled to be easier to visualize.
 *
 * @param system The system to normalize.
 */
function normalizeSystem(system: PlanetarySystem): void {
	system.forEach((body) => {
		if (body == sol) {
			body.radius = Math.pow(body.radius, 1.1);
		}
		body.radius = Math.pow(body.radius, 0.42);
		body.orbitalRadius = Math.pow(body.orbitalRadius, 0.42);
	});

	const maxOrbitalRadius = system
		.map((body) => body.orbitalRadius)
		.reduce((a, b) => Math.max(a, b));

	system.forEach((body) => {
		body.orbitalRadius /= maxOrbitalRadius;
		body.radius /= maxOrbitalRadius;
	});
}

export default normalizeSystem;
