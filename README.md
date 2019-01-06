# Web graphics playgound

## Resources:

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Three.js Docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [Shaders lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-threejs)
- [GLSL Cheet sheet](https://www.khronos.org/files/opengl-quick-reference-card.pdf)
- [MDN - 3d graphics theory](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory)

Some samples in this repo are base on Matt DesLauriers's [canvas-sketch](https://github.com/mattdesl/canvas-sketch) project and [generative art workshop](https://github.com/mattdesl/workshop-generative-art)

## Scope of this project:

- Canvas API
- three.js
- Shaders

---

## Canvas:

## Three.js:

Three.js is a 3d modeling library working on top of WebGL. Some basic concepts connected with 3d creating and displaying 3d graphics:

- Renderer
- Scene - place where
- Camera - view/virtial eye
  - Perspective - points are vanishing,
  - Ortographic - everything looks flat
- Lightning
- Mesh - "instance" of geometry, combination of geometry and material
  - Geometry - sphere, box etc.
  - Material - serface quality of a mesh:
    - MeshBasicMaterial
    - MeshNormalMaterial - for debugging - showing surfaces on 3d
    - MeshStandardMaterial - with light, shoadow etc.

## Shaders:

<p align="center"> 
<img src="https://mdn.mozillademos.org/files/13334/mdn-games-3d-rendering-pipeline.png"/><br>
<a src="https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Basic_theory">Fig. 1 MDN docs about "Basic 3d theory"</a>
</p>

- **Shader** - small program (in this context it is written in glsl) that is ment to do a single task - function that runs on every single pixel (without knowledge of any other pixels)
- **GLSL** - OpenGL Shading Language (check [glsl lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-intro#data-types--syntax))
- Basic data types:
  - bool/int/uint
  - **float** - 1.0
  - **vec2, vec3, vec4** - vectors that work are similar to structs - (1.0, 1.0, 1.0...)
  - bvec - boolean vector
  - mat2, mat3, mat4, mat2x3 - matrixes - mat2 = mat2x2
- 2 main types of shaders:
  - fragment shader - which runs once per pixel
  - vertex shader - which runs on each vertex in a geometry
- Some GLSL **keywords**:
  - attributes - position, UV coordinates, etc. - `attribute vec3 position;`
  - uniforms - constant value across all fragments/pixels (time, viewMatrix etc.) - `uniform mat4 projectionMatrix;`
  - precision - defines the floating point precision the GPU `precision highp float;`
  - varyings - a write-only value that will get passed to the fragment shader `varying float vUv;`
  - in/out/inout function arguments - in = read-only; out = write-only; inout - works similar to reference types
- Accessing structures components (e.g. position.x):
  - 3 identical variants: xyzw, rgba,stpq - and all they are eqaul to variable[0], variable[1]...
  - position.xyz = position.rgb
  - making green:
    `green.rgb = yellow.bgb; // Assign the blue channel of Yellow (0) to red and blue channels`
- Build-in Inputs, Outputs, Constants and Functions:
  - ! be sure to check [Cheet Sheet](https://www.khronos.org/files/opengl-quick-reference-card.pdf) (p. 7) !
  - gl_Color, gl_Normal, gl_Position, gl_FragCoord...
  - pow(), sqrt(), sin(), step(), smoothstep(), mix()...

## General concepts:

- normal - normal to surface = vector pointing outwards
- larp/mix - linear interpolation - giving min, max and t(0,1) returns interpolation - e.g. `larp(-1, 1, 0.5) = 0;` or `larp(0, 10, 0.2) = 2;`

---

## To do:

- research definitions for shaders and WebGl/Three.js
- check out code from workshop
