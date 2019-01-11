uniform vec2 mouse;
uniform float time;
varying vec2 vUv;

float box(in vec2 _vUv, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size, _size+vec2(0.001), _vUv);
    uv *= smoothstep(_size, _size+vec2(0.001), vec2(1.0)-_vUv);
    return uv.x*uv.y;
}

float cross(in vec2 _vUv, float _size){
    return  box(_vUv, vec2(_size,_size/4.)) +
            box(_vUv, vec2(_size/4.,_size));
}

void main(){
    vec2 vUv = vUv;
    vec2 circleTranslation = vec2(cos(time), sin(time))*0.5;
    vec2 mouseTranslation = mouse-.5;
    vUv += (mouse.x == 0.5 && mouse.y == 0.5) ? circleTranslation : mouseTranslation;

    vec3 color = vec3(cross(vUv,0.25));

    gl_FragColor = vec4(color,1.0);
}
