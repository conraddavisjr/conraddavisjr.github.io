/**
 * [getGeo description]
 * @param  {[type]} type       [description]
 * @param  {Array}  dimensions [description]
 * @param  {[type]} 24         [description]
 * @param  {[type]} 24]        [description]
 * @return {[type]}            [description]
 */
function getGeometry(type, dimensions=[2, 24, 24]) {
	var getGeometry;
	switch (type) {
		case 'box':
			getGeometry = new THREE.BoxGeometry(...dimensions);
			break;
		case 'plane':
			getGeometry = new THREE.PlaneGeometry(...dimensions);
			break;
		case 'sphere':
			getGeometry = new THREE.SphereGeometry(...dimensions);
			break;
		default:
			getGeometry = new THREE.SphereGeometry(...dimensions);
			break;
	}

	return getGeometry;
}

export default getGeometry;