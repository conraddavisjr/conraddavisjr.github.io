/**
 * positionLights set the placement of all of the scene's lights
 * @param  {[object]} lights [a collection of the light objects]
 * @return {[null]}       [description]
 */
function positionLights(lights) {

	const {
		dirLight,
		homeSpotLight,
		aboutSpotLight,
		aboutSpotLightBio,
		aboutSpotLightSkills,
		workCenterLight,
		workLightPlay
	} = lights;


	// directional lighting
	dirLight.position.set(38, 69, 40);

	// home section lights
	homeSpotLight.position.set(49, 35, -8.7);
	homeSpotLight.angle = 1;
	homeSpotLight.penumbra = 0;
	homeSpotLight.distance = 35;

	// about section lights
	// general
	aboutSpotLight.position.set(24, -20, 24.4);
	aboutSpotLight.angle = .43;
	aboutSpotLight.penumbra = 1;
	aboutSpotLight.target.position.x = -88;
	aboutSpotLight.target.position.y = 75;
	aboutSpotLight.target.position.z = -8.7;
	aboutSpotLight.target.updateMatrixWorld();
	// bio
	aboutSpotLightBio.position.set(-35, 31, -20);
	aboutSpotLightBio.intensity = 1.7;
	aboutSpotLightBio.penumbra = .38;
	aboutSpotLightBio.angle = 1;
	aboutSpotLightBio.distance = 32;
	aboutSpotLightBio.target.position.x = -29;
	aboutSpotLightBio.target.position.y = -100;
	aboutSpotLightBio.target.position.z = 9;
	aboutSpotLightBio.target.updateMatrixWorld();
	// skills
	aboutSpotLightSkills.position.set(-46, 49, 13);
	aboutSpotLightSkills.intensity = 1.2;
	aboutSpotLightSkills.penumbra = .54;
	aboutSpotLightSkills.angle = .5;
	aboutSpotLightSkills.distance = 71;
	aboutSpotLightSkills.target.position.x = -88;
	aboutSpotLightSkills.target.position.y = 0;
	aboutSpotLightSkills.target.position.z = .2;
	aboutSpotLightSkills.target.updateMatrixWorld();

	// work section lights
	// general
	workCenterLight.position.set(-4, 13, -9);
	workCenterLight.distance = 27;
	// google play
	workLightPlay.position.set(-7, 22, -9);
	workLightPlay.penumbra = 0;
	workLightPlay.angle = .2;
	workLightPlay.distance = 71;
	workLightPlay.target.position.x = -33;
	workLightPlay.target.position.y = -53;
	workLightPlay.target.position.z = -100;
	workLightPlay.target.updateMatrixWorld();
}

export default positionLights;