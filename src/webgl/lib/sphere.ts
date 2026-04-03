/**
 * Creates the vertices for a spherical surface, as well as an array of indices
 * that refer to the vertex array and define triangles that cover the surface.
 * This only creates the surface of a sphere, so partial-spheres will look
 * hollow.
 *
 * @param divisions the number of vertices on each of the circles formed.
 * @param options used for specifying how to draw an incomplete sphere (e.g., a
 * hemisphere or a cone).
 */
function sphere(
	divisions: number, 
	options: SphereOptions = {
		radialDistance: 1,
		azimuthalInterval: [0, 2 * Math.PI],
		polarInterval: [0, Math.PI],
		scaleDivisions: true,
	}
): Sphere {
	// Set the defaults.
	let {
		radialDistance,
		azimuthalInterval,
		polarInterval,
		scaleDivisions,
		isCone,
	} = options
	radialDistance ??= 1
	azimuthalInterval ??= [0, 2 * Math.PI]
	polarInterval ??= [0, Math.PI]
	scaleDivisions ??= true
	isCone ??= false

	// clamp the intervals, we don't need to make unnecessary vertices.
	let azimuthalIntervalWidth = Math.abs(
		azimuthalInterval[0] - azimuthalInterval[1],
	)
	if (azimuthalIntervalWidth > 2 * Math.PI) {
		azimuthalInterval = [0, 2 * Math.PI]
		azimuthalIntervalWidth = 2 * Math.PI
	}
	let polarIntervalWidth = Math.abs(polarInterval[0] - polarInterval[1])
	if (polarIntervalWidth > Math.PI) {
		polarInterval = [0, Math.PI]
		polarIntervalWidth = Math.PI
	}

	// make sure the boundaries are ordered naturally.
	if (azimuthalInterval[0] > azimuthalInterval[1]) {
		let [upperBound, lowerBound] = azimuthalInterval
		azimuthalInterval = [lowerBound, upperBound]
	}
	if (polarInterval[0] > polarInterval[1]) {
		let [upperBound, lowerBound] = polarInterval
		polarInterval = [lowerBound, upperBound]
	}

	let azimuthalDivisions = divisions
	let polarDivisions = divisions

	// scale the divisions, if preferred.
	if (scaleDivisions) {
		azimuthalDivisions = Math.round(
			divisions * azimuthalIntervalWidth / (2 * Math.PI),
		)
		polarDivisions = Math.round(
			divisions * polarIntervalWidth / Math.PI,
		)
	}

	const [azimuthalStart, _azimuthalEnd] = azimuthalInterval
	const azimuthalStep = azimuthalIntervalWidth / azimuthalDivisions
	const [polarStart, _polarEnd] = polarInterval
	const polarStep = polarIntervalWidth / polarDivisions

	// First, we'll draw a circle of the specified radius around the origin,
	// flat on the xy plane (ignoring the z axis). We are only drawing one
	// circle here.
	let points: [number, number, number][] = []
	for (let i = 0; i <= azimuthalDivisions; i++) {
		// We use "<=" instead of "<" because we need to account for the zeroth
		// circle as well. This means there will actually be `azimuthalDivisions + 1`
		// circles, which is important to remember later.
		const azimuthalAngle = azimuthalStart + i * azimuthalStep
		points.push([
			radialDistance * Math.cos(azimuthalAngle), // x
			radialDistance * Math.sin(azimuthalAngle), // y
			0, // z, we're not dealing with this yet.
		])
	}

	// Now, we need to copy this circle for every step along the z-axis.

	// First, we copy the circle. We add "+ 1" because we need to account for
	// the zeroth polar angle as well.
	points = Array(polarDivisions + 1).fill(points).flat()

	// Second, we iterate over the copied points. For each one, we'll calculate
	// the new values for x and y, as well as z based on the trigonometry of
	// the sphere.
	points = points.map(([x, y, z], idx) => {
		// Each circle has a uniform polar angle. For example, if we have 12
		// azimuthal divisions, then the first 12 points describe the "top"-
		// most circle, where the polar angle is `polarStart`. The next 12
		// points refer to the next-highest circle, where the polar angle is
		// `polarStart + polarStep`.
		//
		// Note that we also add the `+ 1` in the division since there are
		// actually `azimuthalDivisions + 1` circles, as we noted before.
		const polarAngle = polarStart +
			Math.floor(idx / (azimuthalDivisions + 1)) * polarStep
		// The projection of the radial arm onto the xy plane, where we drew
		// our circles, is not `radialDistance`, but rather `radialDistance *
		// Math.sin(polarAngle)`. Thus, we must factor this into our x- and y-
		// coordinates.
		x *= Math.sin(polarAngle)
		y *= Math.sin(polarAngle)
		z = radialDistance * Math.cos(polarAngle)
		return [x, y, z]
	})

	// Now, the vertices are all defined. We must now make triangles by
	// defining a number of indices such that the first three points define
	// the first triangle, and the next three define the second triangle, and
	// so on.
	//
	// In order to define such triangles, we can note some properties of the
	// `points` array we've just defined:
	// - Each point has a point "below" it, on the subsequent circle (excluding
	// 	the last circle, obviously). If we're considering the `i`-th point, then
	// 	the point below it should be at `i + azimuthalDivisions` since each
	// 	circle is made up of `azimuthalDivisions` points.
	// - Each point has a point to it's "right," on the same circle. If we're
	// 	considering the `i`-th point, the point to the right should be at
	// 	`i + 1`.
	let triangles: [number, number, number][] = []
	for (
		let vertexIndex = 0;
		vertexIndex < points.length - azimuthalDivisions;
		vertexIndex++
	) {
		// Below, we describe the the corners of a panel.
		let topLeftCorner = vertexIndex
		let topRightCorner = vertexIndex + 1
		let bottomLeftCorner = topLeftCorner + (azimuthalDivisions + 1)
		let bottomRightCorner = topRightCorner + (azimuthalDivisions + 1)
		// Note that `vertexIndex` is less than 
		// `points.length - azimuthalDivisions`,
		// so this loop will not iterate over the last circle at the bottom.
		// This means that there will always be bottom-left and -right corners.

		// We divide the panel into two triangles and add them to the list.
		triangles.push(
			[topLeftCorner, topRightCorner, bottomLeftCorner],
			[bottomLeftCorner, bottomRightCorner, topRightCorner],
		)
	}

	if (isCone) {
		points.push([0, 0, 0])
		const originIdx = points.length - 1

		// start a loop from where we left off
		for (
			let vertexIndex = points.length - azimuthalDivisions - 1;
			vertexIndex < points.length - 1;
			vertexIndex++
		) {
			triangles.push([vertexIndex, vertexIndex + 1, originIdx])
		}
	}

	// Finally, we have flatten the arrays and return them.
	return {
		vertices: new Float32Array(points.flat()),
		indices: new Uint16Array(triangles.flat()),
	}
}

/**
 * Defines some options to customize how a sphere will look. The terminology is
 * based on the spherical coordinate system:
 * https://en.wikipedia.org/wiki/Spherical_coordinate_system
 */
type SphereOptions = {
	/**
	 * Defines the distance between the center of the sphere and any point on
	 * its surface.
	 */
	radialDistance?: number

	/**
	 * Defines the interval of the polar angle.
	 * - If the interval would be broader than `Math.PI`, then it is set to
	 * 	`[0, Math.PI]`.
	 * - You can technically have the first value be the upper bound and vice
	 * 	versa. It doesn't make a difference.
	 *
	 * The polar angle coordinate defines the angle that each circle
	 * perpendicular to the xy-plane will make relative to the positive z-axis.
	 * In practice, this angle can define a cone.
	 *
	 * To make a cone with the top quarter of the sphere, you could specify
	 * that
	 * ```
	 * 	polarInterval: [0, Math.PI / 4]
	 * ```
	 *
	 * To make a hemisphere with the top half, you could specify
	 * ```
	 * 	polarInterval: [0, Math.PI / 2]
	 * ```
	 *
	 * To make a full sphere, you would would just set
	 * ```
	 * 	polarInterval: [0, Math.PI]
	 * ```
	 */
	polarInterval?: [number, number]

	/**
	 * Defines the interval of the azimuthal angle.
	 * - If the interval would be broader than `2 * Math.PI`, then it is set to
	 * 	`[0, 2 * Math.PI]`.
	 * - You can technically have the first value be the upper bound and vice
	 * 	versa. It doesn't make a difference.
	 *
	 * The azimuthal angle coordinate defines the angle that each circle
	 * perpendicular to the z-axis will make relative to the positive x-axis.
	 * In practice, this angle can define a wedge.
	 *
	 * To make a wedge with a quarter of the sphere, you could specify that
	 * ```
	 * 	azimuthalInterval: [0, Math.PI / 2]
	 * ```
	 * In terms of the xy-plane, this wedge would be the portion of the sphere
	 * that fits in the first quadrant.
	 *
	 * To make a hemisphere, you could instead say
	 * ```
	 * 	azimuthalInterval: [0, Math.PI]
	 * ```
	 * In terms of the xy-plane, this hemisphere would cover the first and
	 * second quadrants; i.e., all points on the sphere where the y-values are
	 * positive.
	 *
	 * To make a full sphere, you would would just set
	 * ```
	 * 	azimuthalInterval: [0, 2 * Math.PI]
	 * ```
	 */
	azimuthalInterval?: [number, number]

	/**
	 * When making spheres, the number of divisions typically defines how many
	 * vertices each circle will have. However, by restricting the azimuth
	 * and/or polar intervals, you can create wedges and cones. Such shapes may
	 * not need the same number of longitudal divisions as latitudal, and vice
	 * versa. When this value is `true`, these divisions are scaled to fit such
	 * shapes proportionally.
	 */
	scaleDivisions?: boolean

	/**
	 * If specified, the bottom-most set of vertices will be connected to the
	 * origin. When making a sphere with a less-than-full polar interval, this
	 * will make it look like a cone instead of a cap.
	 */
	isCone?: boolean
}

export type Sphere = {
	vertices: Float32Array
	indices: Uint16Array
}

export default sphere
