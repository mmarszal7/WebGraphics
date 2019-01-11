uniform float time;
varying vec2 vUv;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float box(in vec2 _vUv, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _vUv);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_vUv);
    return uv.x*uv.y;
}

void main(){
    vec2 vUv = vUv;

    // move space from the center
    vUv -= vec2(0.5);
    // rotate the space
    vUv = rotate2d( time ) * vUv;
    // move it back to the original place
    vUv += vec2(0.5);

    vec3 color = vec3(box(vUv,vec2(0.2)));

    gl_FragColor = vec4(color,1.0);
}