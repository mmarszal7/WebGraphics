# Web graphics playgound

## Resources:

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Three.js Docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [Shaders lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-threejs)

Some samples in this repo are base on Matt DesLauriers's [canvas-sketch](https://github.com/mattdesl/canvas-sketch) project and [generative art workshop](https://github.com/mattdesl/workshop-generative-art)

## Scope of this project:

- Canvas API
- WebGL 3d with three.js
- Shaders

---

## Canvas:

## Three.js:

Three.js is a framework working on top of WebGL. Some basic concepts and data structures:

- Renderer
- Scene
- Camera - view/virtial eye
  - Perspective - points are vanishing,
  - Ortographic - everything looks flat
- Mesh - "instance" of geometry, combination of geometry and material
  - Geometry - sphere, box etc.
  - Material - serface quality of a mesh:
    - MeshBasicMaterial
    - MeshNormalMaterial - for debugging - showing surfaces on 3d
    - MeshStandardMaterial - with light, shoadow etc.

## Shaders:

- Shader - small program (in this context it is written in glsl) that is ment to do a single task - function that runs on every single pixel (without knowledge of any other pixels)
- glsl - OpenGL shading language (check [glsl lesson](https://github.com/Jam3/jam3-lesson-webgl-shader-intro#data-types--syntax))
- there are 2 types of shaders:
  - fragment shader - which runs once per pixel
  - vertex shader - which runs on each vertex in a geometry
- basic gsls concepts:
  - attributes - position, UV coordinates, etc. - `attribute vec3 position;`
  - uniforms - constant value across all fragments (time, viewMatrix etc.) - `uniform mat4 projectionMatrix;`
  - precision - defines the floating point precision the GPU `precision highp float;`
  - varyings - a write-only value that will get passed to the fragment shader `varying float vUv;`

## General concepts:

- normal - normal to surface - vector pointing outwards
- larp/mix - linear interpolation - giving min, max and t(0,1) returns interpolation - e.g. `larp(-1, 1, 0.5) = 0;` or `larp(0, 10, 0.2) = 2;`

---

## To do:

- https://thebookofshaders.com
- research definitions for shaders and WebGl/Three.js
- deeper understanding of:
  - canvas
  - three.js/webgl
  - 3d modeling
  - shaders
- check out code from workshop
- play with some custom 3d models
