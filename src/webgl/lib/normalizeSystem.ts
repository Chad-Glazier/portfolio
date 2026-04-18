import type { PlanetarySystem } from "./CelestialBody"

/**
 * "Normalizes" a planetary system, making it so that the entire thing has a
 * radius of 1.
 * 
 * @param system The system to normalize.
 */
function normalizeSystem(system: PlanetarySystem): void {
	let maxOrbitalRadius = system
		.map(body => body.orbitalRadius)
		.reduce((a, b) => Math.max(a, b))

	system.forEach(body => {
		body.orbitalRadius /= maxOrbitalRadius
		body.radius /= maxOrbitalRadius
	})
}

export default normalizeSystem
