let pageLoadStatus = {
	about: false,
	work: false,
	skills: false,
	contact: false,
};

function runPageInterface(page, uiPanel, apiCollection, scene, camera) {
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
			break;
		case 'contact':
			// if the contact script hasn't been loaded, asynchronously load it
			if(!pageLoadStatus[page]) {
				apiCollection.loadScript(pageToLoad)
				.then(renderContact);
			} else {
				renderContact();
			}

			function renderContact() {
				loadPage(contactPage); // contactPage func is loaded by loadScript
			}
		default:
			// statements_def
			break;
	}

	function loadPage(selectedPage) {
		pageLoadStatus[page] = true;
		selectedPage(uiPanel, apiCollection, scene, camera);
	}
}

export default runPageInterface;