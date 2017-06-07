/*
    Extension helper for generating a CurvePath from an array of supplied points.
    Accepts an array of [Vector3] points to contruct the path from.
    ---

    points      Array       List of Vector3 points
    scale       Number      Scale factor

*/

import { Vector3, LineCurve3, CurvePath } from 'three';

export default class CurvePathFromPoints extends CurvePath {

    constructor(points, scale = 10) {

        super();

        this._points = points;
        this._scale = scale;

        this._createCurves();
    }

    _createCurves() {

        for ( var i = 0, len = this._points.length; i < len; i++ ) {

            let next = i === len - 1 ? this._points[ 0 ] : this._points[ i + 1 ];

            let line_curve = new LineCurve3( this._points[ i ].multiplyScalar( this._scale ), next );

            this.add( line_curve );
        }
    }
}