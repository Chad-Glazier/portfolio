import type { CelestialBody, PlanetarySystem } from "../utils/CelestialBody";
import { rgba } from "../utils/colors";

//
// Distance is measured in kilometers.
// Time is measured in seconds.
// Angles are measured in radians.
//

export const sol: CelestialBody = {
	radius: 695_508,
	polarTilt: 0.1265,
	rotationPeriod: 25.67 * 24 * 60 * 60,
	azimuthalTilt: 0,
	orbitalCenter: [0, 0, 0, 1],
	orbitalRadius: 0,
	orbitalPeriod: Number.POSITIVE_INFINITY,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(251, 255, 0, 1),
};

export const terra: CelestialBody = {
	radius: 6_371,
	polarTilt: 0.408407,
	azimuthalTilt: 0,
	rotationPeriod: 24 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 149_600_000,
	orbitalPeriod: 365 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(0, 76, 255, 1),
};

export const luna: CelestialBody = {
	radius: 1_737.5,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 29.5 * terra.rotationPeriod,
	orbitalCenter: terra,
	orbitalRadius: 384_000,
	orbitalPeriod: 29.5 * terra.rotationPeriod,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(196, 196, 196, 1),
};

export const mercury: CelestialBody = {
	radius: 2_439.7,
	polarTilt: 0.00059,
	azimuthalTilt: 0,
	rotationPeriod: 58.6 * 24 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 57_900_000,
	orbitalPeriod: 88 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(200, 200, 200, 1),
};

export const venus: CelestialBody = {
	radius: 6_051.8,
	polarTilt: 3.096,
	azimuthalTilt: 0,
	rotationPeriod: -243 * 24 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 108_200_000,
	orbitalPeriod: 224.7 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 180, 0, 1),
};

export const mars: CelestialBody = {
	radius: 3_389.5,
	polarTilt: 0.4397,
	azimuthalTilt: 0,
	rotationPeriod: 24.6 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 227_900_000,
	orbitalPeriod: 687 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 80, 0, 1),
};

export const phobos: CelestialBody = {
	radius: 11,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 7.65 * 60 * 60,
	orbitalCenter: mars,
	orbitalRadius: 9_376,
	orbitalPeriod: 7.65 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(150, 150, 150, 1),
};

export const deimos: CelestialBody = {
	radius: 6,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 30.3 * 60 * 60,
	orbitalCenter: mars,
	orbitalRadius: 23_460,
	orbitalPeriod: 30.3 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(180, 180, 180, 1),
};

export const jupiter: CelestialBody = {
	radius: 69_911,
	polarTilt: 0.0546,
	azimuthalTilt: 0,
	rotationPeriod: 9.9 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 778_500_000,
	orbitalPeriod: 4333 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 200, 150, 1),
};

export const io: CelestialBody = {
	radius: 1_821.6,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 1.77 * 24 * 60 * 60,
	orbitalCenter: jupiter,
	orbitalRadius: 421_700,
	orbitalPeriod: 1.77 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 255, 0, 1),
};

export const europa: CelestialBody = {
	radius: 1_560.8,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 3.55 * 24 * 60 * 60,
	orbitalCenter: jupiter,
	orbitalRadius: 670_900,
	orbitalPeriod: 3.55 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(200, 200, 255, 1),
};

export const ganymede: CelestialBody = {
	radius: 2_634.1,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 7.15 * 24 * 60 * 60,
	orbitalCenter: jupiter,
	orbitalRadius: 1_070_400,
	orbitalPeriod: 7.15 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(180, 180, 180, 1),
};

export const callisto: CelestialBody = {
	radius: 2_410.3,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 16.7 * 24 * 60 * 60,
	orbitalCenter: jupiter,
	orbitalRadius: 1_882_700,
	orbitalPeriod: 16.7 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(120, 120, 120, 1),
};

export const saturn: CelestialBody = {
	radius: 58_232,
	polarTilt: 0.4665,
	azimuthalTilt: 0,
	rotationPeriod: 10.7 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 1_433_000_000,
	orbitalPeriod: 10759 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 220, 150, 1),
};

export const titan: CelestialBody = {
	radius: 2_575,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: 15.9 * 24 * 60 * 60,
	orbitalCenter: saturn,
	orbitalRadius: 1_221_870,
	orbitalPeriod: 15.9 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(255, 200, 100, 1),
};

export const uranus: CelestialBody = {
	radius: 25_362,
	polarTilt: 1.71,
	azimuthalTilt: 0,
	rotationPeriod: -17.2 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 2_871_000_000,
	orbitalPeriod: 30687 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(150, 255, 255, 1),
};

export const neptune: CelestialBody = {
	radius: 24_622,
	polarTilt: 0.4943,
	azimuthalTilt: 0,
	rotationPeriod: 16.1 * 60 * 60,
	orbitalCenter: sol,
	orbitalRadius: 4_495_000_000,
	orbitalPeriod: 60190 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(100, 150, 255, 1),
};

export const triton: CelestialBody = {
	radius: 1_353.4,
	polarTilt: 0,
	azimuthalTilt: 0,
	rotationPeriod: -5.88 * 24 * 60 * 60,
	orbitalCenter: neptune,
	orbitalRadius: 354_800,
	orbitalPeriod: 5.88 * 24 * 60 * 60,
	initialRotation: 0,
	initialOrbitalRotation: 0,

	color: rgba(200, 200, 255, 1),
};

const solarSystem: PlanetarySystem = [
	sol,

	mercury,
	venus,

	terra,
	luna,

	mars,
	phobos,
	deimos,

	jupiter,
	io,
	europa,
	ganymede,
	callisto,

	saturn,
	titan,

	uranus,
	neptune,
	triton,
];

export default solarSystem;
