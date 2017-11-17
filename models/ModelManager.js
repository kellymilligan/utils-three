/*
    Handles loading and access to OBJ/MTL 3D models for Three.js
    Additional texture assets can be included in the load call.

    Example manifest structure:
    {
        name: 'test',
        path: 'models/',
        entries: [
            {
                id: 'test',
                obj: 'test/test.obj',
                mtl: 'test/test.mtl',
                textures: [ 'test-1.png', 'test-2.png', ... ],
                scale: 3
            },
        ]
    };
*/

import * as THREE from 'three';
import OBJLoader from './lib/OBJLoader';
import MTLLoader from './lib/MTLLoader';

const DEBUG = false;

export default class ModelManager {

    constructor() {

        this._obj_loader = new THREE.OBJLoader();
        this._mtl_loader = new THREE.MTLLoader();
        this._tex_loader = new THREE.TextureLoader();

        this._tex_loader.setCrossOrigin( 'use-credentials' );

        this._loaded = [];
    }


    // Public
    // ------

    getModelById( id ) {

        if ( this._loaded[ id ] === undefined ) {

            console.warn( `ModelManager.js: Model with ID "${ id }" requested, but it's not in the list of loaded models...` );
            return null;
        }

        // Return a copy of the object, not the origin pointer
        return Object.assign( {}, this._loaded[ id ] );
    }

    getLoadedModels() {

        // Return a copy of the array, not the original pointer
        return this._loaded.map( a => a );
    }

    load( manifest, callback ) {

        if ( DEBUG ) console.log( `ModelManager.js: Loading manifest "${ manifest.name }"... `, manifest );

        let loaded_count = 0;

        this._mtl_loader.setPath( manifest.path );
        this._obj_loader.setPath( manifest.path );
        this._tex_loader.setPath( manifest.path );

        manifest.entries.forEach( entry => {

            // Check if the model has already been loaded
            if ( this._loaded[ entry.id ] !== undefined ) {

                loaded_count += 1;
                loaded_count === manifest.entries.length && callback( this._loaded );
                return;
            }

            // Otherwise load the model
            this._loadModel( entry, ( model, textures ) => {

                if ( DEBUG ) console.log( `ModelManager.js: Model loaded: `, model, textures );

                this._loaded[ entry.id ] = {
                    model: model,
                    textures: textures,
                    data: entry
                };

                loaded_count += 1;
                loaded_count === manifest.entries.length && callback( this._loaded );
            } );
        } );
    }


    // Helpers
    // -------

    _loadModel( manifest_entry, callback ) {

        // Load the materials first...
        this._mtl_loader.load( manifest_entry.mtl, materials => {

            materials.preload();
            this._obj_loader.setMaterials( materials );

            // Then the object...
            this._obj_loader.load( manifest_entry.obj, object => {

                // Apply scaling
                let scale = manifest_entry.scale !== undefined ? manifest_entry.scale : 1;
                object.children.forEach( mesh => mesh.scale.set( scale, scale, scale ) );

                // Then any additional textures...
                this._loadTextures( manifest_entry.textures, textures => { callback( object, textures ); } );
            } );
        } );
    }

    _loadTextures( list, callback ) {

        if ( !list.length ) callback( [ ] );

        let loaded_count = 0;
        let textures = [];

        list.forEach( src => {
            this._tex_loader.load( src, texture => {

                textures[ src ] = texture;
                loaded_count += 1;
                loaded_count === list.length && callback( textures );
            } );
        } );
    }

}