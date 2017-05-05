// Note: This example assumes extending Phong material. The same setup can extend
//       any of the default THREE.ShaderLib options: e.g. 'lambert' or 'standard'

let shader_material = new THREE.ShaderMaterial( {
    defines: {
        // 'USE_MAP': '', // Uncomment if using a texture map in this material
        'USE_SHADOWMAP': ''
    },
    lights: true,
    transparent: true,
    fog: true,
    // side: THREE.DoubleSide,
    // wireframe: true,
    uniforms: THREE.UniformsUtils.merge( [
        THREE.ShaderLib[ 'phong' ].uniforms,
        {
            // Like setting the 'color' property on MeshPhongMaterial
            diffuse: { type: 'c', value: {r: 0.4, g: 0.1, b: 1.0} },
            opacity: { type: 'f', value: 1.0 },
            // Custom uniforms
            uCustom: { type: 'f', value: 0.0 }
        }
    ] ),
    // Your version of the phong vert shader - copy from THREE.ShaderLib.phong.vertexShader
    vertexShader: yourVertShader,
    // Your version of the phong frag shader - copy from THREE.ShaderLib.phong.fragmentShader
    fragmentShader: yourFragShader
} );