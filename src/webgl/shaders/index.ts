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

const SKY_F_SOURCE = ``
export { SKY_F_SOURCE }

const SKY_V_SOURCE = ``
export { SKY_V_SOURCE }

const SPHERE_F_SOURCE = `#version 100

precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uTexture;

varying vec3 vSurfaceNormal;
varying vec3 vSurfaceToLight;

void main() {
	vec3 normal = normalize(vSurfaceNormal);
	vec3 surfaceToLightDirection = normalize(vSurfaceToLight);

	float light = max(dot(normal, surfaceToLightDirection), 0.15);

	gl_FragColor = texture2D(uTexture, vTextureCoord);
	gl_FragColor.rgb *= light;
}
`
export { SPHERE_F_SOURCE }

const SPHERE_V_SOURCE = `#version 100

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform vec3 uSphereCenter;
uniform vec3 uLightPoint;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec3 vSurfaceNormal;
varying vec3 vSurfaceToLight;
varying vec2 vTextureCoord;

void main() {
	// Pass texture coordinates straight to the fragment shader
	vTextureCoord = aTextureCoord;

	gl_Position = 
		  uProjectionMatrix 
		* uViewMatrix 
		* uModelMatrix 
		* vec4(aVertexPosition, 1.0);

	// Get the world-space coordinates of the vertex.
	vec3 worldPos = (uModelMatrix * vec4(aVertexPosition, 1.0)).xyz;

	// Get the world-space coordinates of the sphere's center.
	vec3 centerWorldPos = (uModelMatrix * vec4(uSphereCenter, 1.0)).xyz;

	// Pass the normal vector for the surface to the fragment shader.
	vSurfaceNormal = worldPos - centerWorldPos;

	// Pass the vector for the surface to the light to the fragment shader.
	vSurfaceToLight = uLightPoint - worldPos;

	// if the center of the sphere is the light point, then the sphere *is*
	// the light source. Thus, we flip the normal vectors so that it's lit up.
	if (length(centerWorldPos - uLightPoint) < 0.0001) {
		vSurfaceNormal *= -1.0;
	}
}
`
export { SPHERE_V_SOURCE }

