/*
    Calculate the visible width and height units of a PerspectiveCamera
    at the given FOV and Distance from the camera.
    ---
    Source: https://github.com/mrdoob/three.js/issues/1239

    width       Number      Width of the canvas
    height      Number      Height of the canvas
    fov         Number      PerspectiveCamera's vertical FOV value (in degrees)
    distance    Number      Distance from camera

    ---
    Returns     Object      Number of X and Y units visible at distance plane

*/

export default function ( width, height, fov, distance ) {

    let aspect = ( width / height );

    let verti_fov = fov * ( Math.PI / 180 ); // Convert to radians
    let horiz_fov = 2 * Math.atan( Math.tan( verti_fov / 2 ) * aspect );

    let x_units = 2 * Math.tan( ( horiz_fov / 2 ) ) * distance;
    let y_units = 2 * Math.tan( ( verti_fov / 2 ) ) * distance;

    return {
        x: x_units,
        y: y_units
    };
}
