Samples in this repo are base on Matt DesLauriers's [canvas-sketch](https://github.com/mattdesl/canvas-sketch) project and [generative art workshop](https://github.com/mattdesl/workshop-generative-art)

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [Three.js Docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

three.js - framework working on top of WebGL:

- Materials - serface quality of a mesh
- Geometries

- Wireframe - mesh view
- Mesh - "instance" of geometry, combination of geometry and material
- Scene - combined meshed
- Camera - view/virtial eye

  - Perspective - points are vanishing,
  - Ortographic - everything looks flat

- MeshBasicMaterial
- MeshNormalMaterial - for debugging - showing surfaces on 3d
- MeshStandardMaterial - with light, shoadow etc.

- Shader - small program (in this context it is written in glsl) that is ment to do a single task - function that runs on every single pixel (without knowledge of any other pixels)

To do:

- researsh definitions!
- check out code from workshop
