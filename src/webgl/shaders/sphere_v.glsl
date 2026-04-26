#version 100

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
