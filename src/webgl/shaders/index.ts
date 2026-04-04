/**
 * This file was created by running 
 * 
 * ```
 * deno --allow-read --allow-write scripts/build.ts
 * ```
 * 
 * All of the source code here corresponds to the files ending in `.glsl` that
 * were found in the `src/webgl/shaders` directory.
 */

const POINT_F_SOURCE = `#version 100

uniform lowp vec4 uColor;

void main() {
	gl_FragColor = uColor;
}
`
export { POINT_F_SOURCE }

const POINT_V_SOURCE = `#version 100

attribute vec3 aVertexPosition;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
	gl_PointSize = 1.0;
	gl_Position =
		  uProjectionMatrix 
		* uViewMatrix 
		* uModelMatrix 
		* vec4(aVertexPosition, 1.0);
}
`
export { POINT_V_SOURCE }

const SPHERE_F_SOURCE = `#version 100

uniform lowp vec4 uColor;

void main() {
	gl_FragColor = uColor;
}
`
export { SPHERE_F_SOURCE }

const SPHERE_V_SOURCE = `#version 100

attribute vec3 aVertexPosition;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
	gl_Position = 
		  uProjectionMatrix 
		* uViewMatrix 
		* uModelMatrix 
		* vec4(aVertexPosition, 1.0);
}
`
export { SPHERE_V_SOURCE }

