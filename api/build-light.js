/**
 * build a light object
 * @param  {[string]} type    [the type of light]
 * @param  {[array]} options  [properties passed to the light]
 * @param  {[int]} penumbra   [particularly for spotlight (radius)]
 * @return {[object]}         [returns the light object]
 */
function getLight(type, options, penumbra, helper, scene) {
	var light;
	var lightHelper;

	switch (type) {
		case 'point':
			light = new THREE.PointLight(...options);
			if (helper) lightHelper = new THREE.PointLightHelper( light, 5 );
			break;
		case 'spot':
			light = new THREE.SpotLight(...options);
			if (helper) lightHelper = new THREE.SpotLightHelper( light );
			light.penumbra = penumbra ? penumbra : light.penumbra;
			break;
		case 'directional':
			light = new THREE.DirectionalLight(...options);
			if (helper) lightHelper = new THREE.DirectionalLightHelper( light, 5 );
			break;
		case 'ambient':
			light = new THREE.AmbientLight(...options);
			break;
		case 'rect':
			light = new THREE.RectAreaLight( ...options );
			if (helper) lightHelper = new THREE.RectAreaLightHelper( light )
		default:
			light = new THREE.PointLight(...options);
			break;
	}
	if (type !== 'ambient') {
		light.castShadow = true;
		//Set up shadow properties for the light
		// light.shadow.mapSize.width = 1024;  // default: 512
		// light.shadow.mapSize.height = 1024; // default: 512
		light.shadow.mapSize.width = 2048;  // default: 512
		// light.shadow.mapSize.height = 2048; // default: 512
		light.shadow.bias = 0.001;
	}

	// if enabled add a light helper to the scene
	if (helper) scene.add( lightHelper );
	return light;
}

export default getLight;