import type { CelestialBody, PlanetarySystem } from "../CelestialBody"
import { rgba } from "./colors"

//
// Distance is measured in kilometers.
// Time is measured in seconds.
// Angles are measured in radians.
//

const sol: CelestialBody = {
	radius: Math.log10(695508),
	polarTilt: 0.1265,
	rotationPeriod: 25.67 * 24 * 60 * 60,
	azimuthalTilt: 0,
	orbitalCenter: [0, 0, 0, 1],
	orbitalRadius: 0,
	orbitalPeriod: Number.POSITIVE_INFINITY,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 255, 52, 1),
	pointsColor: rgba(255, 255, 255, 1)
}

const terra: CelestialBody = {
	radius: Math.log10(6371),
	polarTilt: 0.408407,
	azimuthalTilt: 0,
	rotationPeriod: 24 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: Math.log(149600000),
	orbitalPeriod: 365 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(0, 34, 255, 1),
	pointsColor: rgba(255, 255, 255, 1)
}

const luna: CelestialBody = {
	radius: Math.log10(1737.5),
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 29.5 * terra.rotationPeriod,
	orbitalCenter: terra,
	orbitalRadius: Math.log(384000),
	orbitalPeriod: 29.5 * terra.rotationPeriod,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(24, 24, 24, 1),
	pointsColor: rgba(255, 255, 255, 1)
}

export const solarSystem: PlanetarySystem = [
	sol, terra, luna
]
