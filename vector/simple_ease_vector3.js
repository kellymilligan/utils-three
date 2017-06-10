/*
    Apply a simple ease tick to the supplied THREE.Vector3
    ---

    vector            Vector3      Vector to apply easing on
    target_vector     Vector3      Vector to ease towards
    ease_factor       Number       Easing strength

*/

export default function ( vector, target_vector, ease_factor ) {

    vector.set(
        vector.x + ( target_vector.x - vector.x ) * ease_factor,
        vector.y + ( target_vector.y - vector.y ) * ease_factor,
        vector.z + ( target_vector.z - vector.z ) * ease_factor
    );
}