/*
    Remove all children from the supplied object
    ---

    parent      Object3D    object to remove children from

*/

export default function removeChildren(parent) {

    parent.children.forEach( child => parent.remove( parent.children[ 0 ] ) );
    return parent;
}