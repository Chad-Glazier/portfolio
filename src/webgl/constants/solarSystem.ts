import type { CelestialBody, PlanetarySystem } from "../utils/CelestialBody";
import { rgba } from "../utils/colors"
import loadTexture from "../utils/loadTexture"

import terraImg from "../../assets/textures/Earth.jpg"
import lunaImg from "../../assets/textures/Moon.jpg"
import mercuryImg from "../../assets/textures/Mercury.jpg"
import venusImg from "../../assets/textures/Venus.jpg"
import marsImg from "../../assets/textures/Mars.jpg"
import phobosImg from "../../assets/textures/Phobos.jpg"
import deimosImg from "../../assets/textures/Deimos.jpg"
import jupiterImg from "../../assets/textures/Jupiter.jpg"
import ioImg from "../../assets/textures/Io.jpg"
import europaImg from "../../assets/textures/Europa.jpg"
import ganymedeImg from "../../assets/textures/Ganymede.jpg"
import callistoImg from "../../assets/textures/Callisto.jpg"
import saturnImg from "../../assets/textures/Saturn.jpg"
import titanImg from "../../assets/textures/Titan.jpg"
import uranusImg from "../../assets/textures/Uranus.jpg"
import neptuneImg from "../../assets/textures/Neptune.jpg"
import tritonImg from "../../assets/textures/Triton.jpg"
import skyImg from "../../assets/textures/Stars.jpg"
import solImg from "../../assets/textures/Sol.jpg"

//
// Distance is measured in kilometers.
// Time is measured in seconds.
// Angles are measured in radians.
//

function solarSystem(
	gl: WebGLRenderingContext
): PlanetarySystem {

	const sky: CelestialBody = {
		name: "sky",
		radius: 4_495_000_000,
		polarTilt: 0,
		rotationPeriod: Number.POSITIVE_INFINITY,
		azimuthalTilt: 0,
		orbitalCenter: [0, 0, 0, 1],
		orbitalRadius: 0,
		orbitalPeriod: Number.POSITIVE_INFINITY,
		initialRotation: 0,
		initialOrbitalRotation: 0,

		texture: loadTexture(gl, skyImg, rgba(0, 0, 0, 1))
	}

	const sol: CelestialBody = {
		name: "sol",
		radius: 695_508,
		polarTilt: 0.1265,
		rotationPeriod: 25.67 * 24 * 60 * 60,
		azimuthalTilt: 0,
		orbitalCenter: [0, 0, 0, 1],
		orbitalRadius: 0,
		orbitalPeriod: Number.POSITIVE_INFINITY,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, solImg, rgba(250, 253, 102, 1))
	};

	const terra: CelestialBody = {
		name: "terra",
		radius: 6_371,
		polarTilt: 0.408407,
		azimuthalTilt: 0,
		rotationPeriod: 24 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 149_600_000,
		orbitalPeriod: 365 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, terraImg, rgba(0, 76, 255, 1))
	};

	const luna: CelestialBody = {
		name: "luna",
		radius: 1_737.5,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 29.5 * terra.rotationPeriod,
		orbitalCenter: terra,
		orbitalRadius: 384_000,
		orbitalPeriod: 29.5 * terra.rotationPeriod,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, lunaImg, rgba(196, 196, 196, 1))
	};

	const mercury: CelestialBody = {
		name: "mercury",
		radius: 2_439.7,
		polarTilt: 0.00059,
		azimuthalTilt: 0,
		rotationPeriod: 58.6 * 24 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 57_900_000,
		orbitalPeriod: 88 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, mercuryImg, rgba(200, 200, 200, 1))
	};

	const venus: CelestialBody = {
		name: "venus",
		radius: 6_051.8,
		polarTilt: 3.096,
		azimuthalTilt: 0,
		rotationPeriod: -243 * 24 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 108_200_000,
		orbitalPeriod: 224.7 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, venusImg, rgba(255, 180, 0, 1))
	};

	const mars: CelestialBody = {
		name: "mars",
		radius: 3_389.5,
		polarTilt: 0.4397,
		azimuthalTilt: 0,
		rotationPeriod: 24.6 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 227_900_000,
		orbitalPeriod: 687 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, marsImg, rgba(255, 80, 0, 1))
	};

	const phobos: CelestialBody = {
		name: "phobos",
		radius: 11,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 7.65 * 60 * 60,
		orbitalCenter: mars,
		orbitalRadius: 9_376,
		orbitalPeriod: 7.65 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, phobosImg, rgba(150, 150, 150, 1))
	};

	const deimos: CelestialBody = {
		name: "deimos",
		radius: 6,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 30.3 * 60 * 60,
		orbitalCenter: mars,
		orbitalRadius: 23_460,
		orbitalPeriod: 30.3 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, deimosImg, rgba(180, 180, 180, 1))
	};

	const jupiter: CelestialBody = {
		name: "jupiter",
		radius: 69_911,
		polarTilt: 0.0546,
		azimuthalTilt: 0,
		rotationPeriod: 9.9 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 778_500_000,
		orbitalPeriod: 4333 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, jupiterImg, rgba(255, 200, 150, 1))
	};

	const io: CelestialBody = {
		name: "io",
		radius: 1_821.6,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 1.77 * 24 * 60 * 60,
		orbitalCenter: jupiter,
		orbitalRadius: 421_700,
		orbitalPeriod: 1.77 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, ioImg, rgba(255, 255, 0, 1))
	};

	const europa: CelestialBody = {
		name: "europa",
		radius: 1_560.8,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 3.55 * 24 * 60 * 60,
		orbitalCenter: jupiter,
		orbitalRadius: 670_900,
		orbitalPeriod: 3.55 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, europaImg, rgba(200, 200, 255, 1))
	};

	const ganymede: CelestialBody = {
		name: "ganymede",
		radius: 2_634.1,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 7.15 * 24 * 60 * 60,
		orbitalCenter: jupiter,
		orbitalRadius: 1_070_400,
		orbitalPeriod: 7.15 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, ganymedeImg, rgba(180, 180, 180, 1))
	};

	const callisto: CelestialBody = {
		name: "callisto",
		radius: 2_410.3,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 16.7 * 24 * 60 * 60,
		orbitalCenter: jupiter,
		orbitalRadius: 1_882_700,
		orbitalPeriod: 16.7 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, callistoImg, rgba(120, 120, 120, 1))
	};

	const saturn: CelestialBody = {
		name: "saturn",
		radius: 58_232,
		polarTilt: 0.4665,
		azimuthalTilt: 0,
		rotationPeriod: 10.7 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 1_433_000_000,
		orbitalPeriod: 10759 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, saturnImg, rgba(255, 220, 150, 1))
	};

	const titan: CelestialBody = {
		name: "titan",
		radius: 2_575,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: 15.9 * 24 * 60 * 60,
		orbitalCenter: saturn,
		orbitalRadius: 1_221_870,
		orbitalPeriod: 15.9 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, titanImg, rgba(255, 200, 100, 1))
	};

	const uranus: CelestialBody = {
		name: "uranus",
		radius: 25_362,
		polarTilt: 1.71,
		azimuthalTilt: 0,
		rotationPeriod: -17.2 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 2_871_000_000,
		orbitalPeriod: 30687 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, uranusImg, rgba(150, 255, 255, 1))
	};

	const neptune: CelestialBody = {
		name: "neptune",
		radius: 24_622,
		polarTilt: 0.4943,
		azimuthalTilt: 0,
		rotationPeriod: 16.1 * 60 * 60,
		orbitalCenter: sol,
		orbitalRadius: 4_495_000_000,
		orbitalPeriod: 60190 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, neptuneImg, rgba(100, 150, 255, 1))
	};

	const triton: CelestialBody = {
		name: "triton",
		radius: 1_353.4,
		polarTilt: 0,
		azimuthalTilt: 0,
		rotationPeriod: -5.88 * 24 * 60 * 60,
		orbitalCenter: neptune,
		orbitalRadius: 354_800,
		orbitalPeriod: 5.88 * 24 * 60 * 60,
		initialRotation: 0,
		initialOrbitalRotation: Math.PI * 2 * Math.random(),

		texture: loadTexture(gl, tritonImg, rgba(200, 200, 255, 1))
	};

	return [
		sky,
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
	]
}


export default solarSystem;
