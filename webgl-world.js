import loadScript from './api/load-script.js';
import loadStyles from './api/load-styles.js';
import getLight from './api/build-light.js';
import getGeometry from './api/build-geometry.js';
import getMaterial from './api/build-material.js';
import cameraRig from './api/camera-rig.js';
import loadObject from './api/load-object.js';
import positionLights from './setters/position-lights.js';
import runPageInterface from './pages/index.js';
// import guiControls from './setters/gui-controls.js';
let webGlLoaded = new Event('webGlLoaded');


// asynchronously load the three.js library and its dependencies
window.updateLoadProgress()
loadScript('lib/three.min.js')
			.then(loadTweenJS)

// load TWEEN.js
function loadTweenJS() {
	window.updateLoadProgress(2)
	loadScript('lib/TWEEN.min.js')
		.then(loadOBJLoader)
}

// load OBJLoader
function loadOBJLoader() {
	window.updateLoadProgress(2)
	loadScript('lib/OBJLoader.min.js')
		.then(loadOBMLoader)
}

// load OBMLoader
function loadOBMLoader() {
	window.updateLoadProgress()
	loadScript('lib/OBMLoader.min.js')
		.then(runWebglWorld)
}

// init and render the 3d world
function runWebglWorld () {
	window.updateLoadProgress()
	new Promise((resolve, reject) => {
		resolve(webglWorld());
	}).then((resolve) => {
		window.updateLoadProgress()
		// allow the main controller to handlePageTransitions
		window.handlePageTransitions = resolve.handlePageTransitions;
		// conclude loading
		window.dispatchEvent(webGlLoaded)
	})
}

/*
	Run the 3d World application
 */
function webglWorld() {
	/*
	 WEBGL World
	 */

	/*
		state
	 */
	let homePageCoords = {x: 0, y: 0, z: 600, rx: 0, ry: 0, rz: 0};
	let currentCameraCoords = {x: 0, y: 0, z: 600, rx: 0, ry: 0, rz: 0};
	let currentPage = 'home';
	let pageIsTransitioning;

	/*
		build camera
	 */
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);

	/*
		query elements
	 */
	let homeButton = document.querySelector('.home-button');
	let aboutButton = document.querySelector('.about-button');
	let workButton = document.querySelector('.work-button');
	let skillsButton = document.querySelector('.skills-button');
	let uiPanel = document.querySelector('.ui-panel');

	/*
		Camera Rigs
	 */
	// extract api methods for the camera rigs
	var {
		fromGlobeProfileToTop,
		moveToHomeSection,
		moveToAboutSection,
		moveToWorkSection,
	 	moveToSkillsSection
	} = cameraRig(homePageCoords, currentCameraCoords, currentPage, camera, pageIsTransitioning);

	/**
	 * start the WebGL application
	 * @return {[obj]} [this returns the application scene]
	 */
	function init() {
		/*
			init scene
		 */
		var scene = new THREE.Scene();


		// initial camera positioning
		var {
			x: startX, y: startY, z: startZ,
			rx: startRX, ry: startRY, rz: startRZ
		} = homePageCoords;

		// apply the home coord to the camera by default
		camera.position.set(startX, startY, startZ);
		camera.rotation.set(startRX, startRY, startRZ);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		 /*
			build lights
		 */
		var dirLight = getLight('directional', ['#fff', 0.6]);
		var ambLight = getLight('ambient', ['#222']);
		var centerStageLight = getLight('point', ['#fff', 0.7]);

		// // About section lights
		var aboutStagelampLight = getLight('point', ['#f90', 1]);
		var aboutfloatingLight = getLight('point', ['#f90', 1]);

		// // Work section lights
		var workLampLightRight = getLight('spot', ['#00a9ff', 1]);
		var workLampLightLeft = getLight('spot', ['#00a9ff', 1]);

		// // Skills section lights
		var skillsfloatingLightLeft = getLight('spot', ['#ff004e', 1]);
		var skillsfloatingLightRight = getLight('spot', ['#ff78cd', 1]);
		var skillsfloatingLightMid = getLight('spot', ['#ff78cd', 1]);

		// incapsulate lamp light in a sphere
		var aboutLampLightBulb = new THREE.Mesh(
			getGeometry('sphere', [0.2, 24, 24]),
			getMaterial('basic', '#ffffdb')
		);

		// place about lamp light source within the about lamp bulb
		aboutLampLightBulb.add(aboutStagelampLight);

		var lights = {
			dirLight,
			ambLight,
			centerStageLight,
			aboutStagelampLight,
			aboutfloatingLight,
			workLampLightRight,
			workLampLightLeft,
			skillsfloatingLightLeft,
			skillsfloatingLightRight,
			skillsfloatingLightMid,
			aboutLampLightBulb
		};

		// set coordinates for the lights
		// positionLights(lights);

		/*
			Load object model
		 */
		loadObject('models/world.obm', scene);
		// loadObject('models/work_section.obm', scene);

		// update load progress
		window.updateLoadProgress()

		/*
			Set GUI controls
		 */
		// guiControls(lights, camera);

		/*
			particle system in a sphere
		 */
		var particleGeo = new THREE.Geometry();
		var particleGeo = new THREE.SphereGeometry(100, 100, 100);
		var particleMat = new THREE.PointsMaterial({
			color: '#fff',
			size: 1.5,
			transparent: true,
			map: new THREE.TextureLoader().load('assets/textures/particle.jpg'),
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});

		var particleSphere = new THREE.Points(
			particleGeo,
			particleMat
		);

		/*
			populate the scene
		 */
		scene.add(dirLight);
		scene.add(ambLight);
		scene.add(particleSphere);
		scene.add(centerStageLight);
		// scene.add(aboutLampLightBulb);
		// scene.add(aboutfloatingLight);
		// scene.add(workLampLightRight);
		// scene.add(workLampLightLeft);
		// scene.add(skillsfloatingLightLeft);
		// scene.add(skillsfloatingLightRight);
		// scene.add(skillsfloatingLightMid);

		/*
			init eventlisteners
		 */
		initEventListeners();

		/*
			define renderer
		 */
		var renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		document.getElementById('webgl').appendChild(renderer.domElement);

		// orbiting controls
		// var controls = new THREE.OrbitControls( camera, renderer.domElement );

		// update load progress
		window.updateLoadProgress()

		// run renderer
		update(renderer, scene, camera);
		return scene;
	}

	/*
		hide all of the pages within the UI panel
	 */
	function hidePage(currentPage) {
		let currentPgContainer = uiPanel.querySelector(`.${currentPage}-container`);

		if (currentPgContainer) {
			currentPgContainer.style.visibility = 'hidden';
			currentPgContainer.style.opacity = 0;
		}
	}

	/**
	 * controller with rules for handling page transitions
	 * @param  {Function} callback [callback, particularly page transitions]
	 * @return {[type]}            [description]
	 */
	var handlePageTransitions = function (page) {
		let animationFunc;
		let option;

		// if the selected page is different from the active page
		// hide the active page
		if (page !== currentPage) hidePage(currentPage);

		switch (page) {
			case 'home':
				animationFunc = moveToHomeSection;
				break;
			case 'about':
				animationFunc = moveToAboutSection;
				option = true;
				break;
			case 'work':
				animationFunc = moveToWorkSection;
				break;
			case 'skills':
				animationFunc = moveToSkillsSection;
				option = true;
				break;
			default:
				// statements_def
				break;
		}
		// disable buttons during page transitions
		if (pageIsTransitioning || currentPage === page) return;
		pageIsTransitioning = true;

		// if on the home page and prompted with additional animation option, use custom entry animation
		let rigData
		currentPage === 'home' && option ? rigData = fromGlobeProfileToTop(animationFunc, page) : rigData = animationFunc(page);
		currentPage = page;

		setTimeout(dockPage, rigData.animationDuration);

		// lock world coords when moved to a different page
		function dockPage() {
			// update the state of the page transition
			updateCurrentCameraCoords();

			// compile a list of apis to reference
			let apiCollection = {
				loadScript,
				loadStyles
			};

			// run the page interface
			runPageInterface(currentPage, uiPanel, apiCollection, loadObject, scene, camera);

		}

		function updateCurrentCameraCoords(targetCoords = currentCameraCoords) {
			pageIsTransitioning = false;
			currentCameraCoords = rigData.targetCoords;
		}
	}

	function initEventListeners() {
		homeButton.addEventListener('click', () => handlePageTransitions('home'));
		aboutButton.addEventListener('click', () => handlePageTransitions('about'));
		workButton.addEventListener('click', () => handlePageTransitions('work'));
		skillsButton.addEventListener('click', () => handlePageTransitions('skills'));
	}

	/**
	 * render the world and run animation
	 * @param  {[obj]} renderer [webGL renderer]
	 * @param  {[obj]} scene    [the webGL scene and all of its elements]
	 * @param  {[obj]} camera   [the scene camera]
	 * @return {[func call]}    [run requestAnimationFrame]
	 */
	function update(renderer, scene, camera) {

		// enabling tweening
		TWEEN.update();
		// var particles = scene.getObjectByName('particles');
		// particles.rotation.y +=0.5;

		// render the world
		renderer.render(scene, camera);
		requestAnimationFrame(function() {
			update(renderer, scene, camera);
		});
	}

	// init the 3D world and make its contents available to the console
	var scene = init();

	// return the handlePageTransitions to be used outside
	return {
		handlePageTransitions
	}
}