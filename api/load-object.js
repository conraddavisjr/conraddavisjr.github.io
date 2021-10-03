/**
 * load an obj into the scene
 * @param  {[type]} src   [description]
 * @param  {[type]} scene [description]
 * @return {[type]}       [description]
 */
function loadObject(src, scene) {
	console.log('loadObject called: ', src, scene);
	// instantiate a loader
	var objLoader = new THREE.OBMLoader();

	// load the resource
	objLoader.load(
		// resource URL
		src,
		// called when resource is loaded
		function (object) {
			// enable shadows
			object.traverse(function (child) {
			    if (child instanceof THREE.Mesh) {
		        child.castShadow = true;
		        child.receiveShadow = true;
			    }
			});

			scene.add(object);
		}
	);
}

export default loadObject;