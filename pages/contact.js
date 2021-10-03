let contactPageHasLoaded = false;
let contactContainerName = 'contact-container';
const contactPath = 'pages/contact';
const contactTl = new TimelineLite();

function contactPage(uiPanel, apiCollection, scene, camera) {
  // if the page hasn't loaded yet, populate it in the DOM
  if(!contactPageHasLoaded) {

    // load ui template styles, then build the view
    apiCollection.loadStyles(`${contactPath}/styles.css`).then(buildUI());

    // loadObject('models/contact_section.obm', scene);

    function buildUI() {
      // generate ui template
      let interfaceUI = `
        <div class="${contactContainerName}">
          <div class='info-container'>
            <div class='contact-card'></div>
            <div class='info name'>Conrad Davis Jr</div>
            <div class='info email'>Conraddavisjr@gmail.com</div>
          </div>
        </div>
      `;

      uiPanel.insertAdjacentHTML('afterbegin', interfaceUI);
      mountInterface();
    }

    function mountInterface() {
      contactContainerEl = document.querySelector(`.${contactContainerName}`);
    }

    // declare that that contact page has loaded,
    // voiding the need to reload it.
    contactPageHasLoaded = true;
    rendercontactPage();
  }
  else {
    rendercontactPage();
  }

  function fadeIn() {
    console.log('FADEIN CALLED: ', contactContainerEl)
    contactContainerEl.style.opacity = 1;
    contactContainerEl.style.visibility = 'visible';
  }

  function rendercontactPage() {
    // fade in the UI
    setTimeout(fadeIn, 50);
  }

}