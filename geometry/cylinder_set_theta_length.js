/*
    Change the thetaLength on a THREE.CylinderGeometry
    ---
    Note: Currently assumes an openEnded cylinder only. The 'cap' vertices
          will also need adjustment if a non-openEnded cylinder is required.

    geometry        THREE.Geometry      Geometry to adjust
    thetaLength     Number              New thetaLength in radians

*/

export default function(geometry, thetaLength = Math.PI * 2) {

    if ( geometry.parameters.openEnded === false ) { console.warn('CylinderGeometry.parameters.openEnded is false, this util can only update vertices on openEnded cylinder geometry.'); }
    if ( geometry.parameters.thetaLength === undefined ) { console.warn('CylinderGeometry.parameters.thetaLength was not defined and so defaulted to a full cylinder (2PI). In order to adjust thetaLength it should be instantiated with a length of less than 2PI.'); }

    // Use defaults for missing values.
    // Defaults as specified: https://github.com/mrdoob/three.js/blob/master/src/geometries/CylinderGeometry.js
    let radiusTop = geometry.parameters.radiusTop || 20;
    let radiusBottom = geometry.parameters.radiusBottom || 20;
    let height = geometry.parameters.height || 100;
    let radialSegments = geometry.parameters.radialSegments || 8;
    let heightSegments = geometry.parameters.heightSegments || 1;
    let thetaStart = geometry.parameters.thetaStart || 0;

    for ( let y = 0; y <= heightSegments; y ++ ) {

        let v = y / heightSegments;

        let radius = v * ( radiusBottom - radiusTop ) + radiusTop;

        for ( let x = 0; x <= radialSegments; x ++ ) {

            let u = x / radialSegments;

            var theta = u * thetaLength + thetaStart;

            let vertex = geometry.vertices[ ( y * ( radialSegments + 1 ) ) + x ];

            vertex.x = radius * Math.sin( theta );
            vertex.y = -v * height + ( height * 0.5 );
            vertex.z = radius * Math.cos( theta );
        }
    }

    geometry.verticesNeedUpdate = true;
    geometry.computeVertexNormals();
}