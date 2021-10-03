/**
 * build a light object
 * @param  {[string]} type    [the type of light]
 * @param  {[array]} options  [properties passed to the light]
 * @param  {[int]} penumbra   [particularly for spotlight (radius)]
 * @return {[object]}         [returns the light object]
 */
function cameraRig(
	currentCameraCoords,
	currentPage,
	camera,
	dockPage
) {

	/*
		animation collection
	*/
	// animation graph
	const animationGraph = {
		contact: {
			targetCoords: [
				{x: -2, y: 30, z: 30, rx: 0, ry: -1, rz: 0}, // to scene center
				{x: 57, y: 11, z: -22, rx: 0, ry: -4, rz: 0}, // to mountain bottom
				{x: 50, y: 29.5, z: -16, rx: 0, ry: 2.5, rz: 0} // to contact front
			],
			timing: 2000,
			delay: 1000
		},
		about: {
			targetCoords: {x: 19, y: 31, z: -3.4, rx: 0, ry: 1.57, rz: 0},
			timing: 2000,
			delay: 1000
		},
		aboutSkills: {
			targetCoords: {x: -56.5, y: 32.86, z: 9.22, rx: 0, ry: 1.57, rz: 0},
			timing: 2000,
			delay: 1000
		},
		aboutBio: {
			targetCoords: [
				{x: 24, y: 37, z: -2, rx: 0, ry: 1.5, rz: 0}, // animation pt 1
				{x: -35, y: 28, z: -22, rx: .5, ry: 3.2, rz: 0}, // move to human figure
			],
			timing: 2000,
			delay: 1000
		},
		work: {
			targetCoords: () => {
				const tCoords = window.innerWidth >= 600 ?
					{x: 6.1, y: 14, z: 18, rx: -.2, ry: .36, rz: 0}
					: {x: 11.8, y: 20, z: 35, rx: -.2, ry: .36, rz: 0};

				return tCoords;
			},
			timing: 2000,
			delay: 0
		},
		workPlay: {
			targetCoords: {x: -11.4, y: 19.7, z: -11, rx: -.5, ry: -.23, rz: 0},
			timing: 2000,
			delay: 0
		},
		workSamsung: {
			targetCoords: {x: .6, y: 5, z: -12, rx: 0, ry: .22, rz: 0},
			timing: 2000,
			delay: 0
		},
		workAudi: {
			targetCoords: {x: -13, y: 11, z: -7.5, rx: 1, ry: 4.27, rz: 1},
			timing: 2000,
			delay: 0
		},
		workGather: {
			targetCoords: {x: 0, y: 6, z: -20.2, rx: 0, ry: 1.49, rz: 0},
			timing: 2000,
			delay: 0
		},
		skills: {
			targetCoords: {x: 16, y: 10, z: -22, rx: -3, ry: 1.3, rz: -3},
			timing: 2000,
			delay: 0
		}
	};

	const {
		contact,
		about,
		aboutSkills,
		aboutBio,
		work,
		workPlay,
		workGather,
		workSamsung,
		workAudi,
		skills
	} = animationGraph;

	var buildTween = function(
		targetCoords,
		currentCameraCoords,
		timing = 2000,
		delay = 0,
		easing = TWEEN.Easing.Quadratic.InOut
	) {
		// check if multiple options are passed
		let customTiming = Array.isArray(timing) ? true : false;
		let customDelay = Array.isArray(delay) ? true : false;
		let customEasing = Array.isArray(easing) ? true : false;

		let position = new TWEEN.Tween(currentCameraCoords)
		.to(targetCoords, customTiming ? timing[0] : timing)
		.delay(customDelay ? delay[0] : delay)
		.easing(customEasing ? easing[0] : easing)
		.onUpdate(function() {
			camera.position.x = currentCameraCoords.x
			camera.position.y = currentCameraCoords.y
			camera.position.z = currentCameraCoords.z
		})

		let rotation = new TWEEN.Tween(currentCameraCoords)
		.to(targetCoords, customTiming ? timing[1] : timing)
		.delay(customDelay ? delay[1] : delay)
		.easing(customEasing ? easing[1] : easing)
		.onUpdate(function() {
			camera.rotation.x = currentCameraCoords.rx
			camera.rotation.y = currentCameraCoords.ry
			camera.rotation.z = currentCameraCoords.rz
		})

		return {
			position,
			rotation
		}
	}

	var moveToContactSection = function(page) {
		let { targetCoords, timing } = contact;
		let isIntroAnimation;
		let finalContactCoords;

		// make specific animation tweaks based on the current page
		// if the page is first loading (default), run the intro animation
		if (currentPage === 'default') {
			isIntroAnimation = true;
			runContactIntroAnimation();
		} else {
			isIntroAnimation = false;
			moveToContact();
		}

		// update the current page state
		currentPage = page;
		function runContactIntroAnimation() {

			let contactCoords =
				targetCoords.slice().map((obj) => Object.assign({}, obj));

			// move camera to scene center
			let tween1 = buildTween(
				contactCoords[0],
				currentCameraCoords,
				[timing, timing + 1000],
				0,
				TWEEN.Easing.Quadratic.Out
			)

			// rotate camera to house, move to mountain bottom
			let tween2 = buildTween(
				contactCoords[1],
				currentCameraCoords,
				[timing, timing - 1000],
				0,
				TWEEN.Easing.Quadratic.InOut
			)

			// run animations
			tween1.rotation.start().chain(tween2.rotation);
			tween1.position.start().chain(tween2.position);

			tween2.rotation.onComplete(() => {
				// run the final sequence of the contact animation
				moveToContact();
			})
		}

		function moveToContact() {
			let fromAnimation;
			let contactRotationCoords;
			let rotationEasing; timing * 2;

			if (isIntroAnimation) {
				fromAnimation = targetCoords[1];
				contactRotationCoords = fromAnimation;
				rotationEasing = TWEEN.Easing.Circular.InOut;
			} else {
				fromAnimation = currentCameraCoords;
				contactRotationCoords = Object.assign({}, targetCoords[1]);
				// update the final contact coords
				finalContactCoords = Object.assign({}, targetCoords[2]);
				finalContactCoords.ry = contactRotationCoords.ry;
				rotationEasing = TWEEN.Easing.Quadratic.InOut;
				interPageRotation();
			}

			// rotate camera to house
			// inter-page rotation
			function interPageRotation() {
				new TWEEN.Tween(currentCameraCoords)
				.to(contactRotationCoords, timing + 1000)
				.easing(rotationEasing)
				.onUpdate(function() {
					camera.rotation.x = currentCameraCoords.rx
					camera.rotation.y = currentCameraCoords.ry
					camera.rotation.z = currentCameraCoords.rz
				})
				.start();
			}

			// move to house front
			new TWEEN.Tween(currentCameraCoords)
			.to(targetCoords[2], timing + 1000)
			.easing(TWEEN.Easing.Sinusoidal.InOut)
			.onUpdate(function() {
				camera.position.x = currentCameraCoords.x
				camera.position.y = currentCameraCoords.y
				camera.position.z = currentCameraCoords.z
			})
			.start()
			.onComplete(() => dockPage());
		}
	}

	/**
	 * animation from the profile of the scene to the top of it
	 * @param  {Function} callback [pass in function, particularly an animation func]
	 * @return {[null]}            [nothing, this is an execution]
	 */
	var fromGlobeProfileToTop = function(callback) {
		// target coords for the animation to the top of the scene
		var targetCoords = {x: 0, y: 550, z: 0, rx: -1.6, ry: 0, rz: 0};
		var timing = 1500;

		new TWEEN.Tween(currentCameraCoords)
		.to(targetCoords, timing)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.position.x = currentCameraCoords.x
			camera.position.y = currentCameraCoords.y
			camera.position.z = currentCameraCoords.z
			camera.rotation.x = currentCameraCoords.rx
			camera.rotation.y = currentCameraCoords.ry
			camera.rotation.z = currentCameraCoords.rz
		})
		.start()
		.onComplete(() => {
			callback();
		})
	}

	var moveToAboutSection = function(page) {
		let { targetCoords, timing, delay } = about;
		let aboutCoords = Object.assign({}, targetCoords);

		if (currentPage !== 'default') delay = 0;

		// update the current page state
		currentPage = page;

		// animate to the about section
		const aboutSectionTween =
			buildTween(
				aboutCoords,
				currentCameraCoords,
				[timing, timing],
				[0, 500],
				TWEEN.Easing.Quadratic.InOut
			)

		aboutSectionTween.position.start();
		aboutSectionTween.rotation.start();
		aboutSectionTween.rotation.onComplete(() => dockPage());
	}

	var moveToAboutSkills = function(page, callback) {
		let { targetCoords, timing } = aboutSkills;
		let aboutSkillCoords = Object.assign({}, targetCoords);

		// update the current page state
		currentPage = page;

		// make specific animation tweaks based on the rotation y
		// value being tweened from
		const prevRy = Math.sign(currentCameraCoords.ry);
		if (prevRy == 1 || prevRy == 0) aboutSkillCoords.ry = 1.54; // its positive or zero
		else aboutSkillCoords.ry = -4.7; // its a negative value

		// animate to the about - skills section
		const aboutSkillsTween =
			buildTween(
				aboutSkillCoords,
				currentCameraCoords,
				timing
			)

		aboutSkillsTween.position.start();
		aboutSkillsTween.rotation.start();
		aboutSkillsTween.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToAboutBio = function(page, callback) {
		let { targetCoords, timing } = aboutBio;
		let delay;
		let aboutBioCoords =
				targetCoords.slice().map((obj) => Object.assign({}, obj));

		// update the current page state
		currentPage = page;
		delay = [500, 400];

		// move to the About bio section
		let bioTweenP1 = buildTween(
			aboutBioCoords[0],
			currentCameraCoords,
			timing,
			[0, delay[0]]
		);

		let bioTweenP2 = buildTween(
			aboutBioCoords[1],
			currentCameraCoords,
			timing,
			[0, delay[1]]
		);

		bioTweenP1.rotation.chain(bioTweenP2.position, bioTweenP2.rotation);
		bioTweenP1.position.start();
		bioTweenP1.rotation.start();

		bioTweenP2.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToWorkSection = function(page) {
		let { targetCoords, timing } = work;
		let workCoords = Object.assign({}, targetCoords());

		// update the current page state
		currentPage = page;

		// move to the Work section
		let workSectionTween = buildTween(
			workCoords,
			currentCameraCoords,
			[timing, timing]
		);

		workSectionTween.rotation.start();
		workSectionTween.position.start();
		workSectionTween.rotation.onComplete(() => {
			dockPage();
			window.pinVisibility(true);
		});
	}

	var moveToWorkPlay = function(page, callback) {
		let { targetCoords, timing } = workPlay;
		let workPlayCoords = Object.assign({}, targetCoords);

		// update the current page state
		currentPage = page;

		// animate to the work - play section
		const workPlayTween =
			buildTween(
				workPlayCoords,
				currentCameraCoords,
				timing
			)

		workPlayTween.position.start();
		workPlayTween.rotation.start();
		workPlayTween.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToWorkGather = function(page, callback) {
		let { targetCoords, timing } = workGather;
		let workGatherCoords = Object.assign({}, targetCoords);

		// update the current page state
		currentPage = page;

		// animate to the work - play section
		const workGatherTween =
			buildTween(
				workGatherCoords,
				currentCameraCoords,
				timing
			)

		workGatherTween.position.start();
		workGatherTween.rotation.start();
		workGatherTween.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToWorkSamsung = function(page, callback) {
		let { targetCoords, timing } = workSamsung;
		let workSamsungCoords = Object.assign({}, targetCoords);

		// update the current page state
		currentPage = page;

		// animate to the work - play section
		const workSamsungTween =
			buildTween(
				workSamsungCoords,
				currentCameraCoords,
				timing
			)

		workSamsungTween.position.start();
		workSamsungTween.rotation.start();
		workSamsungTween.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToWorkAudi = function(page, callback) {
		let { targetCoords, timing } = workAudi;
		let workAudiCoords = Object.assign({}, targetCoords);

		// update the current page state
		currentPage = page;

		// animate to the work - play section
		const workAudiTween =
			buildTween(
				workAudiCoords,
				currentCameraCoords,
				timing
			)

		workAudiTween.position.start();
		workAudiTween.rotation.start();
		workAudiTween.rotation.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var workCameraLookUp = function(page, callback) {

		let timing = 2000;
		let workLookUpCoordsFrom = Object.assign({}, currentCameraCoords);
		// adjust the current coords to make the camera 'look up'
		workLookUpCoordsFrom.rx += 2;
		workLookUpCoordsFrom.y -= 2;
		workLookUpCoordsFrom.z -= 5;

		// update the current page state
		currentPage = page;

		new TWEEN.Tween(currentCameraCoords)
		.to(workLookUpCoordsFrom, timing)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.rotation.x = currentCameraCoords.rx
			camera.position.y = currentCameraCoords.y
			camera.position.z = currentCameraCoords.z
		})
		.start()
		.onComplete(() => {
			dockPage();
			if (callback) callback();
		});
	}

	var moveToSkillsSection = function(page) {
		let { targetCoords, timing } = skills;
		currentPage = page;

		new TWEEN.Tween(currentCameraCoords)
		.to(targetCoords, timing)
		.easing(TWEEN.Easing.Quadratic.Out)
		.onUpdate(function() {
			camera.position.x = currentCameraCoords.x
			camera.position.y = currentCameraCoords.y
			camera.position.z = currentCameraCoords.z
		})
		.start();

	  new TWEEN.Tween(currentCameraCoords)
		.to(targetCoords, timing)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.rotation.x = currentCameraCoords.rx
			camera.rotation.y = currentCameraCoords.ry
			camera.rotation.z = currentCameraCoords.rz
		})
		.start()
		.onComplete(() => dockPage());
	}

	return {
		moveToContactSection,
		fromGlobeProfileToTop,
		moveToAboutSection,
		moveToAboutSkills,
		moveToAboutBio,
		moveToWorkSection,
		moveToWorkPlay,
		moveToWorkGather,
		moveToWorkSamsung,
		moveToWorkAudi,
		workCameraLookUp,
		moveToSkillsSection,
		animationGraph,
	}
}

export default cameraRig;
