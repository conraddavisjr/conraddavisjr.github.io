import loadScript from './api/load-script.js';
import loadStyles from './api/load-styles.js';
import getLight from './api/build-light.js';
import getGeometry from './api/build-geometry.js';
import getMaterial from './api/build-material.js';
import cameraRig from './api/camera-rig.js';
import loadObject from './api/load-object.js';
import buildText from './api/build-text.js';
import positionLights from './setters/position-lights.js';
import runPageInterface from './pages/index.js';
// import guiControls from './setters/gui-controls.js';

let webGlLoaded = new Event('webGlLoaded');
let interactivePinGeometry = [];
let loadedModels = {};
/*
	store a reference map for the portfolio items
*/
const workProfileMap = {
	0: {name: 'workPlay', copy: 'Google Play', pos: {x: -5, y: 15.5, z: -8}},
	1: {name: 'workGather', copy: 'Google Gather', pos: {x: -13, y: 7, z: -11}},
	2: {name: 'workSamsung', copy: 'Samsung Gear S2', pos: {x: 0, y: 9, z: -18}},
	3: {name: 'workAudi', copy: 'Audi USA', pos: {x: -2, y: 6, z: 2}},
}

const workPinBoundingBoxPositions = {
	0: {name: 'workPlay',  pos: {bx: -7, by: 14, bz: -13}},
	1: {name: 'workGather',  pos: {bx: -13, by: 8, bz: -15}},
	2: {name: 'workSamsung', pos: {bx: -2, by: 8, bz: -21}},
	3: {name: 'workAudi',  pos: {bx: -2, by: 6, bz: -3}},
}

// asynchronously load the three.js library and its dependencies
window.updateLoadProgress()
loadScript('lib/three.min.js')
			.then(loadTweenJS)

// load TWEEN.js
function loadTweenJS() {
	window.updateLoadProgress(2)
	loadScript('lib/Tween.min.js')
	.then(GLTFLoader)
}

// load GLTFLoader
function GLTFLoader() {
	window.updateLoadProgress(2)
	loadScript('lib/GLTFLoader.js')
		.then(runWebglWorld)
}

// init and render the 3d world
function runWebglWorld () {
	window.updateLoadProgress(2)
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
		default states
	 */
	let defaultCoords = {x: 0, y: 24, z: 500, rx: 0, ry: 0, rz: 0};
	// let homePageCoords = {x: 50, y: 31, z: -16, rx: 0, ry: -4, rz: 0};
	let currentCameraCoords = defaultCoords;
	let pageData = {
		currentPage: 'default',
		type: 'main',
		root: 'default'
	}
	let {
		currentPage,
		type,
		root
	} = pageData;
	// let currentPage = 'default'; // the current page is no page; the default coords
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
		declare raycaster and 3D mouse globally
	*/
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	/*
		query elements
	 */
	let aboutButton = document.querySelector('.about-button');
	let workButton = document.querySelector('.work-button');
	let contactButton = document.querySelector('.contact-button');
	let uiPanel = document.querySelector('.ui-panel');

	/*
		Camera Rigs
	 */
	// inject api methods into the camera rig
	var {
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
		moveToContactSection,
	} = cameraRig(
		currentCameraCoords,
		currentPage,
		camera,
		dockPage
	);

	/**
	 * start the WebGL application
	 * @return {[obj]} [this returns the application scene]
	 */
	function init() {
		var scene = new THREE.Scene();

		/*
			Dynamically generate interactive pins with copy
		*/
		buildInteractivePins(scene, workProfileMap);

		// initial camera positioning
		var {
			x: startX, y: startY, z: startZ,
			rx: startRX, ry: startRY, rz: startRZ
		} = defaultCoords;

		// apply the home coords to the camera by default
		camera.position.set(startX, startY, startZ);
		camera.rotation.set(startRX, startRY, startRZ);

		 /*
			build lights
		 */
			var dirLight = getLight('directional', ['#fff', 1.3]);

			// home section lights
			var homeSpotLight = getLight('spot', ['#fff', 9, 100]);

			// about section lights
			var aboutSpotLight = getLight('spot', ['#fff', 4.8, 100]);
			var aboutSpotLightBio = getLight('spot', ['#fff', 2, 100]);
			var aboutSpotLightSkills = getLight('spot', ['#fff', 2, 100]);

			// work section lights
			var workCenterLight = getLight('point', ['#fff', 3.2, 100]);
			var workLightPlay = getLight('spot', ['#ff9c23', 4.5, 100]);

		var lights = {
			dirLight,
			homeSpotLight,
			aboutSpotLight,
			aboutSpotLightBio,
			aboutSpotLightSkills,
			workCenterLight,
			workLightPlay
		};

		// set coordinates for the lights
		positionLights(lights);

		// update load progress (loading bar)
		window.updateLoadProgress()

		/*
			Set GUI controls
		 */
		// guiControls(lights, camera);

		/*
			particle system in a sphere
		 */
		// var particleGeo = new THREE.Geometry();
		// var particleGeo = new THREE.SphereGeometry(100, 100, 100);
		// var particleMat = new THREE.PointsMaterial({
		// 	color: '#fff',
		// 	size: 1.5,
		// 	transparent: true,
		// 	map: new THREE.TextureLoader().load('assets/textures/particle.jpg'),
		// 	blending: THREE.AdditiveBlending,
		// 	depthWrite: false
		// });

		// var particleSphere = new THREE.Points(
		// 	particleGeo,
		// 	particleMat
		// );
		// particleSphere.name = 'particles'


		window.loadPage3dModel = (page) => {
			if (loadedModels[page]) return;

			/*
				Load object model glb/gltf
			*/
			loadObject(`models/${page}/scene.glb`, scene);
			loadedModels[page] = true;
		}
	
		// load the initial 3d Model based on the initial nav item clicked
		window.loadPage3dModel(window.selectedPage);

		/*
			populate the scene
		 */
		scene.add(dirLight);
		scene.add(homeSpotLight);
		scene.add(aboutSpotLight);
		scene.add(aboutSpotLightBio);
		scene.add(aboutSpotLightSkills);
		scene.add(workCenterLight);
		scene.add(workLightPlay);
		// scene.add(particleSphere);

		/*
			define renderer
		 */
		var renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		document.getElementById('webgl').appendChild(renderer.domElement);

		/*
			init event listeners
		 */
		initEventListeners(renderer);

		// update load progress
		window.updateLoadProgress()

		// run renderer
		update(renderer, scene, camera);
		window.scene = scene;
		return scene;
	}

	/*
		hide all of the pages within the UI panel
	 */
	function hidePage(root) {
		let currentPgContainer = uiPanel.querySelector(`.${root}-container`);

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
	var handlePageTransitions = function (page, callback) {

		let animationFunc;
		let option;
		let updatedRoot;

		// declare animation settings based on the page selected
		switch (page) {
			case 'contact':
				animationFunc = moveToContactSection;
				type = 'main';
				updatedRoot = 'contact';
				break;
			case 'about':
				animationFunc = moveToAboutSection;
				option = false;
				type = 'main';
				updatedRoot = 'about'
				break;
			case 'aboutSkills':
				animationFunc = moveToAboutSkills;
				type = 'sub';
				updatedRoot = 'about'
				break;
			case 'aboutBio':
				animationFunc = moveToAboutBio;
				type = 'sub';
				updatedRoot = 'about'
				break;
			case 'work':
				animationFunc = moveToWorkSection;
				type = 'main';
				updatedRoot = 'work'
				break;
			case 'workPlay':
				animationFunc = moveToWorkPlay;
				type = 'sub';
				updatedRoot = 'work'
				break;
			case 'workGather':
				animationFunc = moveToWorkGather;
				type = 'sub';
				updatedRoot = 'work'
				break;
			case 'workSamsung':
				animationFunc = moveToWorkSamsung;
				type = 'sub';
				updatedRoot = 'work'
				break;
			case 'workAudi':
				animationFunc = moveToWorkAudi;
				type = 'sub';
				updatedRoot = 'work'
				break;
			case 'workLookUp':
				animationFunc = workCameraLookUp;
				type = 'sub';
				updatedRoot = 'work'
				break;
			case 'skills':
				animationFunc = moveToSkillsSection;
				option = true;
				type = 'main';
				updatedRoot = 'skills'
				break;
			default:
				// statements_def
				break;
		}

		// if the selected page is different from the active page
		// hide the active page
		if (page !== currentPage && type == 'main' && root !== updatedRoot) {
			hidePage(root);
		}

		// disable buttons during page transitions unless you're on the work subpage
		if (pageIsTransitioning || currentPage === page && type !== 'sub') return;
		pageIsTransitioning = true;

		// if on init (default) and prompted with an additional
		// animation option, use custom entry animation, otherwise
		// use the selected animationFunc
		currentPage === 'default' && option ?
			fromGlobeProfileToTop(animationFunc, callback) :
		animationFunc(page, callback);

		// currentPage = currentPage ? currentPage : page;
		currentPage = page;
		root = updatedRoot;
	}

	// confirm that the page transition completed and render the interface
	function dockPage() {
		// update the state of the page transition
		pageIsTransitioning = false;

		// compile a list of apis to reference
		let apiCollection = {
			loadScript,
			loadStyles,
			handlePageTransitions
		};

		// store the apiCollection globally
		window.apiCollection = apiCollection;

		// run the page interface
		runPageInterface(currentPage, uiPanel, apiCollection, scene, camera);
	}

	function initEventListeners(renderer) {
		contactButton.addEventListener('click', () => window.goToPage('contact'));
		aboutButton.addEventListener('click', () => window.goToPage('about'));
		workButton.addEventListener('click', () => window.goToPage('work'));
		window.addEventListener('resize', () => onWindowResize(renderer), false);

		// event listeners for raycasting (clicking the work planets)
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('click', onDocumentClick, false);

	}

	window.goToPage = (page) => {
		window.loadPage3dModel(page)
		handlePageTransitions(page);
		window.pinVisibility(false);
	}
	
	/**
	 * dynamically generate interactive pins and copy
	 * @param {*} scene 
	 */
	function buildInteractivePins(scene, dataObj) {
		var fontLoader = new THREE.FontLoader();

		fontLoader.load('fonts/helvetiker_regular.typeface.json', function(font) {
			for (let i=0; i < 4; i++) {
				let pinGeo = getGeometry('sphere', [.3, 20, 20]);
				let hitBoxGeo = getGeometry('box', [4, 4, 4]);
				let sphereMat = getMaterial('basic', 'white');
				let hitBoxMat = getMaterial('basic', 'red');
				let pin = new THREE.Mesh(pinGeo, sphereMat);
				let hitBox = new THREE.Mesh(hitBoxGeo, hitBoxMat);
				let {x, y, z} = workProfileMap[i].pos;
				let {bx, by, bz} = workPinBoundingBoxPositions[i].pos;

				// load the ui fonts
				let text = buildText(font, 'white', dataObj[i].copy);
				let pinRadius = pin.geometry.parameters.radius;

				// set a position exception for the Samsung copy
				workProfileMap[i].name == 'workSamsung' ?
					text.position.set(x - 7, y, z + 4)
					: text.position.set(x + .8, y - (pinRadius / 2), z);
				
				text.rotation.y = .3;
				pin.name = `${workProfileMap[i].name}`;
				hitBox.name = `${workProfileMap[i].name}-hit-box`;
				text.name = `${workProfileMap[i].name}`;

				pin.material.transparent = true;
				hitBox.material.transparent = true;
				text.material.transparent = true;

				pin.material.opacity = 0;
				text.material.opacity = 0;
				hitBox.material.opacity = 0;

				pin.position.set(x, y, z);
				hitBox.position.set(bx, by, bz);

				pin.add(text);
				scene.add(pin);
				scene.add(text);
				scene.add(hitBox);
				interactivePinGeometry.push(pin);
				interactivePinGeometry.push(hitBox);
				interactivePinGeometry.push(text);
			}
		});
	}

	/**
	 * handle mouse moves over the word world
	 */
	function onDocumentMouseMove() {
		var intersects = updateRaycasting();

		// if hovered over or off a pin, trigger hover, unhover effects
		if (intersects.length > 0) {
			let hoveredPinName = intersects[0].object.name;
			hoveredPinName = hoveredPinName.replace('-hit-box', '');

			// change the mouse cursor to a pointer
			document.body.style.cursor = "pointer";

			interactivePinGeometry.forEach(row => {
				if (row.name.includes(hoveredPinName)) row.material.color.setHex(0xf5e7d4);
			})
		} else {
			interactivePinGeometry.forEach(row => {
				row.material.color.setHex(0xffffff);
			})

			// change the mouse cursor to a default
			document.body.style.cursor = "default";
		}
	}

	function onDocumentClick() {
		var intersects = updateRaycasting();

		// when clicking over a pin go to the corresponding page and hide the pins
		if (intersects.length > 0) {
			let hoveredPinName = intersects[0].object.name;
			let pinName = hoveredPinName.replace('-hit-box', '');

			window.renderPortfolioPage(pinName);
			window.pinVisibility(false);
		}
	}

	window.pinVisibility = (pinVisibility = true) => {
		let pinOpacityArray = [];

		interactivePinGeometry.forEach(row => {
			if(row.name.includes('-hit-box') && pinVisibility) return;
			pinOpacityArray.push(row.material);
		})

		const tl = new TimelineLite();

		tl.to(pinOpacityArray, 1, {opacity: pinVisibility});
	}

	function updateRaycasting() {
		mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
		raycaster.setFromCamera(mouse, camera);

		return raycaster.intersectObjects(interactivePinGeometry);
	}

	/**
	 * on window resize, readjust the camera position to
	 * maintain a center position
	 * 
	 * @param {obj} renderer - THREE render obj
	 */
	function onWindowResize(renderer) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
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