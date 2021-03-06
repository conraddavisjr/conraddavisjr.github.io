/**
 * guiControls set the placement of all of the scene's lights
 * @param  {[object]} group [a collection of the light objects]
 * @return {[null]}       [description]
 */
function guiControls(lights, camera) {

	const {
		dirLight,
		homeSpotLight,
		aboutSpotLight,
		workCenterLight
	} = lights;

	/*
		dat.gui props
	 */
	var gui = new dat.GUI();

	// var folder1 = gui.addFolder('aboutSpotLight');
	// folder1.add(aboutSpotLight.position, 'x', -100, 100);
	// folder1.add(aboutSpotLight.position, 'y', -100, 100);
	// folder1.add(aboutSpotLight.position, 'z', -100, 100);
	// folder1.add(aboutSpotLight, 'intensity', 0, 10);
	// folder1.add(aboutSpotLight, 'penumbra', 0, 1);
	// folder1.add(aboutSpotLight, 'angle', 0, 1);
	// folder1.add(aboutSpotLight.target.position, 'x', -100, 100).onChange(()=> {
	// 	aboutSpotLight.target.updateMatrixWorld()
	// });
	// folder1.add(aboutSpotLight.target.position, 'y', -100, 100).onChange(()=> {
	// 	aboutSpotLight.target.updateMatrixWorld()
	// });
	// folder1.add(aboutSpotLight.target.position, 'z', -100, 100).onChange(()=> {
	// 	aboutSpotLight.target.updateMatrixWorld()
	// });
	// folder1.open();

	// var folderSkills = gui.addFolder('skills_left_light');
	// folderSkills.add(skillsfloatingLightLeft.position, 'x', -100, 100);
	// folderSkills.add(skillsfloatingLightLeft.position, 'y', -100, 100);
	// folderSkills.add(skillsfloatingLightLeft.position, 'z', -100, 100);
	// folderSkills.add(skillsfloatingLightLeft, 'intensity', 0, 10);
	// folderSkills.add(skillsfloatingLightLeft, 'penumbra', 0, 1);
	// folderSkills.add(skillsfloatingLightLeft, 'angle', 0, 1);
	// folderSkills.add(skillsfloatingLightLeft.target.position, 'x', -100, 100).onChange(()=> {
	// 	skillsfloatingLightLeft.target.updateMatrixWorld()
	// });
	// folderSkills.add(skillsfloatingLightLeft.target.position, 'y', -100, 100).onChange(()=> {
	// 	skillsfloatingLightLeft.target.updateMatrixWorld()
	// });
	// folderSkills.add(skillsfloatingLightLeft.target.position, 'z', -100, 100).onChange(()=> {
	// 	skillsfloatingLightLeft.target.updateMatrixWorld()
	// });

	// var folderSkillsMid = gui.addFolder('skills_mid_light');
	// folderSkillsMid.add(skillsfloatingLightMid.position, 'x', -100, 100);
	// folderSkillsMid.add(skillsfloatingLightMid.position, 'y', -100, 100);
	// folderSkillsMid.add(skillsfloatingLightMid.position, 'z', -100, 100);
	// folderSkillsMid.add(skillsfloatingLightMid, 'intensity', 0, 10);
	// folderSkillsMid.add(skillsfloatingLightMid, 'penumbra', 0, 1);
	// folderSkillsMid.add(skillsfloatingLightMid, 'angle', 0, 1);
	// folderSkillsMid.add(skillsfloatingLightMid.target.position, 'x', -100, 100).onChange(()=> {
	// 	skillsfloatingLightMid.target.updateMatrixWorld()
	// });
	// folderSkillsMid.add(skillsfloatingLightMid.target.position, 'y', -100, 100).onChange(()=> {
	// 	skillsfloatingLightMid.target.updateMatrixWorld()
	// });
	// folderSkillsMid.add(skillsfloatingLightMid.target.position, 'z', -100, 100).onChange(()=> {
	// 	skillsfloatingLightMid.target.updateMatrixWorld()
	// });


	// var folder4 = gui.addFolder('test_light2');
	// folder4.add(dirLight.position, 'x', -100, 100);
	// folder4.add(dirLight.position, 'y', -100, 100);
	// folder4.add(dirLight.position, 'z', -100, 100);
	// folder4.add(dirLight, 'intensity', 0, 10);

	// var folder2 = gui.addFolder('center_light');
	// folder2.add(centerStageLight.position, 'x', -100, 100);
	// folder2.add(centerStageLight.position, 'y', -100, 100);
	// folder2.add(centerStageLight.position, 'z', -100, 100);
	// folder2.add(centerStageLight, 'intensity', 0, 10);

	var cameraGui = gui.addFolder('camera');
	cameraGui.add(camera.position, 'x', -250, 350);
	cameraGui.add(camera.position, 'y', -250, 350);
	cameraGui.add(camera.position, 'z', -250, 350);
	cameraGui.add(camera.rotation, 'x', -(Math.PI/2) * 10, Math.PI/2 * 10);
	cameraGui.add(camera.rotation, 'y', -(Math.PI/2) * 10, Math.PI/2 * 10);
	cameraGui.add(camera.rotation, 'z', -(Math.PI/2) * 10, Math.PI/2 * 10);
	cameraGui.open();
}

export default guiControls;