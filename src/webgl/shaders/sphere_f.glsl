#version 100

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
