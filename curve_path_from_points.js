/*
    Extension helper for generating a CurvePath from an array of supplied points.
    Accepts an array of [Vector3] points to contruct the path from.
    Note: Currently assumes a closed path, and uses the first point as the final.
    ---

    points      Array       List of Vector3 points
    width       Number      optional - Width of the path, useful when using normalised X
    height      Number      optional - Height of the path, useful when using normalised Y
    scale       Number      optional - Scale factor

*/

import { Vector3, LineCurve3, CurvePath } from 'three';
import {PI, TWO_PI, HALF_PI} from '../math/constants';

export default class CustomCurvePath extends CurvePath {

    constructor(

        points,

        width = 1,
        height = 1,
        scale = 1

    ) {

        super();

        this._path_config = {
            points: points,
            width: width,
            height: height,
            scale: scale
        };

        this._createCurves();
    }

    _createCurves() {

        for ( var i = 0, len = this._path_config.points.length; i < len; i++ ) {

            let v1 = this._path_config.points[ i ];
            let v2 = i === len - 1 ? this._path_config.points[ 0 ] : this._path_config.points[ i + 1 ];

            // Apply dimensions
            v1.x *= this._path_config.width * this._path_config.scale;
            v1.y *= this._path_config.height * this._path_config.scale;
            v1.z *= this._path_config.height * this._path_config.scale; // Assume depth == height

            let line_curve = new LineCurve3( v1, v2 );

            this.add( line_curve );
        }
    }
}