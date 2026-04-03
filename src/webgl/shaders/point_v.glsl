#version 100

attribute vec3 aVertexPosition;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
	gl_PointSize = 2.0;
	gl_Position =
		  uProjectionMatrix 
		* uViewMatrix 
		* uModelMatrix 
		* vec4(aVertexPosition, 1.0);
}
