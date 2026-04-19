import type { PlanetarySystem } from "./CelestialBody"
import { sol } from "./constants/solarSystem"

/**
 * "Normalizes" a planetary system, making it so that the entire thing has a
 * radius of 1.
 * 
 * @param system The system to normalize.
 */
function normalizeSystem(system: PlanetarySystem): void {

	// Get the minimum size and the maximum size. We can have a constant k that
	// denotes the maximum adjusted size as a multiple of the minimum size. The
	// function between minimum and maximum can be cubic instead of linear to
	// allow for large objects to still be much larger than the smallest ones.

	system.forEach(body => {
		if (body == sol) {
			body.radius = Math.pow(body.radius, 0.45)
			body.orbitalRadius = Math.pow(body.orbitalRadius, 0.45)		
		} else {
			body.radius = Math.pow(body.radius, 0.42)
			body.orbitalRadius = Math.pow(body.orbitalRadius, 0.38)			
		}
	})

	const maxOrbitalRadius = system
		.map(body => body.orbitalRadius)
		.reduce((a, b) => Math.max(a, b))

	system.forEach(body => {
		body.orbitalRadius /= maxOrbitalRadius
		body.radius /= maxOrbitalRadius
	})
}

export default normalizeSystem
