/**
 * Creates an RGB color suitable for passing to WebGL as a `vec4`.
 * 
 * Each of the parameters should be values from 0-255.
 */
export function rgb(
	red: number, 
	green: number, 
	blue: number
): Float32Array {
	return new Float32Array([ 
		red / 255, 
		green / 255, 
		blue / 255, 
		1 
	])
}

/**
 * Creates an RGB color suitable for passing to WebGL as a `vec4`.
 * 
 * Each of the parameters should be values from 0-255, except for the opacity
 * which should be in [0,1].
 */
export function rgba(
	red: number, 
	green: number, 
	blue: number, 
	opacity: number
): Float32Array {
	return new Float32Array([ 
		red / 255, green / 255, blue / 255, opacity 
	])
}
