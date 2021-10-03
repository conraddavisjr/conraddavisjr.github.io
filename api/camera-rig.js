/**
 * build a light object
 * @param  {[string]} type    [the type of light]
 * @param  {[array]} options  [properties passed to the light]
 * @param  {[int]} penumbra   [particularly for spotlight (radius)]
 * @return {[object]}         [returns the light object]
 */
function cameraRig(homePageCoords, currentCameraCoords, currentPage, camera, pageIsTransitioning) {

	/*
		animation collection
	*/
	// animation graph
	var animationGraph = {
		about: {
			targetCoords: {x: -8.5, y: 24, z: -2, rx: 0, ry: -2.6, rz: 0},
			// timing: 0,
			// delay: 0
			timing: 2000,
			delay: 1000
		},
		work: {
			targetCoords: {x: 6.5, y: 6, z: 44, rx: 0.35, ry: 0, rz: -3},
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
		about,
		work,
		skills
	} = animationGraph;

	/**
	 * animation from the side of the globe to the top of it
	 * @param  {Function} callback [pass in function, particularly an animation func]
	 * @return {[null]}            [nothing, this is an execution]
	 */
	var fromGlobeProfileToTop = function(callback, page) {
		var targetCoords = {x: 0, y: 550, z: 0, rx: -1.6, ry: 0, rz: 0};
		var timing = 1500;
		var destTiming = animationGraph[page].timing;
		var destDelay = animationGraph[page].delay;
		var destCoords = animationGraph[page].targetCoords;

		new TWEEN.Tween(currentCameraCoords)
			.to(targetCoords, timing)
			.easing(TWEEN.Easing.Quadratic.InOut)
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
			.onComplete(() => {
				callback();
			})
			.start();

		// return the combined timing of this animation and the page destination,
		// along with the target coods of the page destination
		return {
			animationDuration: (destTiming + destDelay) + timing,
			targetCoords: destCoords
		}
	}

	var moveToAboutSection = function(page) {
		let { targetCoords, timing, delay } = about;

		// if not coming from the home page, remove the delayed animation
		if(currentPage !== 'home') delay = 0;
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
		.to(targetCoords, timing + 500)
		.delay(delay)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.rotation.x = currentCameraCoords.rx
			camera.rotation.y = currentCameraCoords.ry
			camera.rotation.z = currentCameraCoords.rz
		})
		.start();

		return {
			animationDuration: timing + delay,
			targetCoords
		}
	}

	var moveToWorkSection = function(page) {
		let { targetCoords, timing, delay } = work;
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
		.start();

		return {
			animationDuration: timing,
			targetCoords
		}
	}

	var moveToSkillsSection = function(page) {
		let { targetCoords, timing, delay } = skills;
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
		.start();

		return {
			animationDuration: timing,
			targetCoords
		}
	}

	var moveToHomeSection = function() {
		currentPage = 'home';
		var timing = 2000;
		var delay = 1000;

		new TWEEN.Tween(currentCameraCoords)
		.to(homePageCoords, timing)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.rotation.x = currentCameraCoords.rx
			camera.rotation.y = currentCameraCoords.ry
			camera.rotation.z = currentCameraCoords.rz
		})
		.start();

	  new TWEEN.Tween(currentCameraCoords)
		.to(homePageCoords, timing)
		.delay(delay)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			camera.position.x = currentCameraCoords.x
			camera.position.y = currentCameraCoords.y
			camera.position.z = currentCameraCoords.z
		})
		.start();

		return {
			animationDuration: timing + delay
		}
	}

	return {
		fromGlobeProfileToTop,
		moveToAboutSection,
		moveToWorkSection,
		moveToSkillsSection,
		moveToHomeSection
	}
}

export default cameraRig;
