/**
 * positionLights set the placement of all of the scene's lights
 * @param  {[object]} group [a collection of the light objects]
 * @return {[null]}       [description]
 */
function positionLights(group) {

	const {
		dirLight,
		ambLight,
		centerStageLight,
		aboutStagelampLight,
		aboutLampLightBulb,
		aboutfloatingLight,
		workLampLightRight,
		workLampLightLeft,
		skillsfloatingLightLeft,
		skillsfloatingLightRight,
		skillsfloatingLightMid
	} = group;


	// directional lighting
	dirLight.position.set( 50, 200, 100 );

	// center stage lighting
	centerStageLight.position.set(5, 20, 0);
	centerStageLight.intensity = 0.16;

	// the light bulb for the lamp in the about section
	aboutLampLightBulb.position.set(0.2, 23.8, 30);

	// the light bulb for the lamp in the about section
	aboutfloatingLight.position.set(5, 11, 20);
	aboutfloatingLight.intensity = 0.7;

	// work section right light properties
	workLampLightRight.position.set(6, 7, 31);
	workLampLightRight.intensity = 0.8;
	workLampLightRight.angle = 0.6;
	workLampLightRight.penumbra = 0.05;
	workLampLightRight.target.position.x = 31;
	workLampLightRight.target.position.y = 31;
	workLampLightRight.target.position.z = 0;
	workLampLightRight.target.updateMatrixWorld();

	// work section left light properties
	workLampLightLeft.position.set(22, 4.5, 27);
	workLampLightLeft.intensity = 0.8;
	workLampLightLeft.angle = 0.5;
	workLampLightLeft.penumbra = 0.07;
	workLampLightLeft.target.position.x = 0.2;
	workLampLightLeft.target.position.y = 18;
	workLampLightLeft.target.position.z = 29;
	workLampLightLeft.target.updateMatrixWorld();

	// skills section left light properties
	skillsfloatingLightLeft.position.set(16, 0, -20);
	skillsfloatingLightLeft.intensity = 0.6;
	skillsfloatingLightLeft.angle = 0.6;
	skillsfloatingLightLeft.penumbra = 0.02;
	skillsfloatingLightLeft.target.position.x = 0;
	skillsfloatingLightLeft.target.position.y = 5;
	skillsfloatingLightLeft.target.position.z = -17;
	skillsfloatingLightLeft.target.updateMatrixWorld();

	// skills section right light properties
	skillsfloatingLightRight.position.set(7, 11, -24);
	skillsfloatingLightRight.intensity = 0.5;
	skillsfloatingLightRight.angle = 0.5;
	skillsfloatingLightRight.penumbra = 0.02;
	skillsfloatingLightRight.target.position.x = -11;
	skillsfloatingLightRight.target.position.y = 0;
	skillsfloatingLightRight.target.position.z = 16;
	skillsfloatingLightRight.target.updateMatrixWorld();

	// skills section right light properties
	skillsfloatingLightMid.position.set(17.8, 11, -17);
	skillsfloatingLightMid.intensity = 0.7;
	skillsfloatingLightMid.angle = 0.7;
	skillsfloatingLightMid.penumbra = 0.02;
	skillsfloatingLightMid.target.position.x = -29;
	skillsfloatingLightMid.target.position.y = 0;
	skillsfloatingLightMid.target.position.z = -24;
	skillsfloatingLightMid.target.updateMatrixWorld();
}

export default positionLights;