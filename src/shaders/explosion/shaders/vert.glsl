varying vec3 vNormal;
uniform float time;

void main () {
  vNormal = normal;

  vec4 offset = vec4(position.xyz , 1.0 );

  // Animate between 0 and 1
  // sin(x) returns a value in [-1...1] range
  float dist = sin(time) * 0.5 + 0.5;
//   float dist = 0.75;

  offset.xyz += normal * dist;
  gl_Position = projectionMatrix * modelViewMatrix * offset;
}