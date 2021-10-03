/**
 * load an obj into the scene
 * @param  {[type]} src   [description]
 * @param  {[type]} scene [description]
 * @return {[type]}       [description]
 */
function loadObject(src, scene, cb) {
	console.log('loadObject called: ', src, scene);

	// instantiate a loader
	const gltfLoader = new THREE.GLTFLoader();

	gltfLoader.load(src, function ( data ) {

		console.log('data: ', data)

		const gltf = data;

		var object = gltf.scene;

			// object.traverse( function ( node ) {

				// console.log('node: ', node)
				// console.log('node.name: ', node.name)

				// if (node.name == 'Sun') {
				// 	console.warn('this is the sun light: ', node)
				// }

				// if ( node.material && ( node.material.isMeshStandardMaterial ||
				// 	( node.material.isShaderMaterial && node.material.envMap !== undefined ) ) ) {

				// 		// console.log('node.material.isMeshStandardMaterial: ', node.material.isMeshStandardMaterial)

				// 	// node.material.emissiveIntensity = 10.5
				// 	// node.material.metalness = 1
				// 	// node.material.roughness = 0
				// 	console.log('node.material: ', node.material)
				// 	// node.material.receiveShadows = true;
				// 	// node.material.aoMapIntensity = 0;
				// 	node.material.envMap = envMap;
				// 	node.material.envMapIntensity = 1.5; // boombox seems too dark otherwise

				// }

			// } );

		scene.add(object);

		if (cb) cb(object);

	})
}

export default loadObject;