import type { CelestialBody, PlanetarySystem } from "./CelestialBody";
import normalizeSystem from "./normalizeSystem";
import { rgba } from "./webgl_utils/colors";

//
// Distance is measured in kilometers.
// Time is measured in seconds.
// Angles are measured in radians.
//

export const sol: CelestialBody = {
	radius: 695508,
	polarTilt: 0.1265,
	rotationPeriod: 25.67 * 24 * 60 * 60,
	azimuthalTilt: 0,
	orbitalCenter: [0, 0, 0, 1],
	orbitalRadius: 0,
	orbitalPeriod: Number.POSITIVE_INFINITY,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(0, 0, 0, 1),
	pointsColor: rgba(251, 255, 0, 1),
};

export const terra: CelestialBody = {
	radius: 6371,
	polarTilt: 0.408407,
	azimuthalTilt: 0,
	rotationPeriod: 24 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 149600000,
	orbitalPeriod: 365 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(0, 0, 0, 1),
	pointsColor: rgba(0, 255, 251, 1),
};

export const luna: CelestialBody = {
	radius: 1737.5,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 29.5 * terra.rotationPeriod,
	orbitalCenter: terra,
	orbitalRadius: 384000,
	orbitalPeriod: 29.5 * terra.rotationPeriod,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(0, 0, 0, 1),
	pointsColor: rgba(196, 196, 196, 1),
};

const solarSystem: PlanetarySystem = [
	sol,
	terra,
	luna,
];
normalizeSystem(solarSystem);

export default solarSystem;
