#version 100

precision highp float;

uniform vec4 uColor;

varying vec3 vSurfaceNormal;
varying vec3 vSurfaceToLight;

void main() {
	vec3 normal = normalize(vSurfaceNormal);
	vec3 surfaceToLightDirection = normalize(vSurfaceToLight);

	float light = max(dot(normal, surfaceToLightDirection), 0.1);

	gl_FragColor = uColor;
	gl_FragColor.rgb *= light;
}
