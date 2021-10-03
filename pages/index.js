let pageLoadStatus = {
	about: false,
	work: false,
	skills: false,
	contact: false,
};

function runPageInterface(page, uiPanel, apiCollection, loadObject, scene, camera) {
	let pageToLoad = `pages/${page}.js`;

	switch (page) {
		case 'about':
			// if the about script hasn't been loaded, asynchronously load it
			if(!pageLoadStatus[page]) {
				apiCollection.loadScript(pageToLoad)
				.then(renderAbout);
			} else {
				renderAbout();
			}

			function renderAbout() {
				loadPage(aboutPage); // aboutPage func is loaded by loadScript
			}
			break;
		case 'work':
			// if the work script hasn't been loaded, asynchronously load it
			if(!pageLoadStatus[page]) {
				apiCollection.loadScript(pageToLoad)
				.then(renderWork);
			} else {
				renderWork();
			}

			function renderWork() {
				loadPage(workPage); // workPage func is loaded by loadScript
			}
		default:
			// statements_def
			break;
	}

	function loadPage(selectedPage) {
		pageLoadStatus[page] = true;
		selectedPage(uiPanel, apiCollection, loadObject, scene, camera, page);
	}
}

export default runPageInterface;