let workPageHasLoaded = false;
let workContainerName = 'work-container';
let workNavName = 'work-nav';
let workNav;
let workNavBtns;
let workPath = 'pages/work';
let portfolioPath = `${workPath}/portfolio`;
let workCurrentSubpage;
let currentPortfolio;
let workContainer;
let portScrollDownArrows;
let closePortBtn;
let workDownArrow;
let portfolioIsOpen = false;
let scaffoldDrawn;
let workTl = new TimelineLite();
let loadedSubpages = {};
let loadedPortfolios = {};
let portfolioPages = ['workPlay', 'workSamsung', 'workAudi', 'workGather'];
let portfolioUiScaffold = document.querySelector('.ui-scaffold');
let outlineHasDrawn;
let loadedModel;

function workPage(uiPanel, apiCollection, scene, camera) {
  // if the page hasn't loaded yet, populate it in the DOM
  if(!workPageHasLoaded) {

    // load ui template styles
    window.apiCollection.loadStyles(`${workPath}/styles.css`).then(buildUI());

    // listen for keyboard button press
    document.onkeydown = handleKeyDown;

    // remove the img-loading class from loaded images
    window.imageLoaded = function imageLoaded(e) {
      let target = e.target;
      let targetParent = target.parentNode;
      targetParent.style.backgroundImage = `url(${e.target.src})`;
      targetParent.classList.remove('img-loading');
    }

    function handleKeyDown(e) {
      if (e.key == "Escape" && portfolioIsOpen) closePortfolio();
    }

    function buildUI() {
      // generate ui template
      let interfaceUI = `
        <div class="${workContainerName}">
          <div class="close-portfolio-button" style="display:none">X</div>
          <div class=${workNavName}>
            <div class="work-nav-arrows" style="display:none">
              <div class="left">
                <svg class="svg-arrow" viewBox="0 0 24 24">
                  <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
                  <path fill="none" d="M0 0h24v24H0z"/>
                </svg>
              </div>
              <div class="right">
                <svg class="svg-arrow" viewBox="0 0 24 24">
                  <path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
                  <path fill="none" d="M0 0h24v24H0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="work-sub-page work-sub-page-workGather" style="opacity: 0">
            <div class="work-sub-page-content">
              <h1>Google Gather</h1>
              <h2>Global campaigns</h2>
              <div class="port-cta gather"> See details </div>
            </div>
          </div>
          <div class="work-sub-page work-sub-page-workPlay" style="opacity: 0">
            <div class="work-sub-page-content">
              <h1>Google Play</h1>
              <h2>Change the Game campaign</h2>
              <div class="port-cta play"> See details </div>
            </div>
          </div>
          <div class="work-sub-page work-sub-page-workSamsung" style="opacity: 0">
            <div class="work-sub-page-content">
              <h1>Samsung</h1>
              <h2>Gear S2 campaign</h2>
              <div class="port-cta samsung"> See details </div>
            </div>
          </div>
          <div class="work-sub-page work-sub-page-workAudi" style="opacity: 0">
            <div class="work-sub-page-content">
              <h1>Audi</h1>
              <h2>USA Website</h2>
              <div class="port-cta audi"> See details </div>
            </div>
          </div>
        </div>
      `;

      // add the UI to the DOM
      uiPanel.insertAdjacentHTML('afterbegin', interfaceUI);
      mountInterface();
    }

    function mountInterface() {
      workContainer = document.querySelector(`.${workContainerName}`);
      workNav = document.querySelector(`.${workNavName}`);
      closePortBtn = document.querySelector('.close-portfolio-button');
      workDownArrow = document.querySelector('.work-down-arrow');
      workNavArrows = document.querySelector('.work-nav-arrows');
      let workNavLeft = workNav.querySelector('.left');
      let workNavRight = workNav.querySelector('.right');
      const workButton = document.querySelector('.work-button');
      const gGatherCta = document.querySelector('.port-cta.gather');
      const gPlayCta = document.querySelector('.port-cta.play');
      const audiCta = document.querySelector('.port-cta.audi');
      const samsungCta = document.querySelector('.port-cta.samsung');

      workButton.addEventListener('click', () => {
        // set the current sub-page to this page
        workCurrentSubpage = null;
        workTl.set(
          [closePortBtn, workDownArrow],
          {visibility: 'hidden', opacity: 0}
        );
        hidePages();
        shiftSubNav(false);
        navVisibility(null, true);
      });

      closePortBtn.addEventListener('click', () => closePortfolio());
      gGatherCta.addEventListener('click', () => window.renderPortfolioPage('workGather', 'workLookUp'));
      gPlayCta.addEventListener('click', () => window.renderPortfolioPage('workPlay', 'workLookUp'));
      audiCta.addEventListener('click', () => window.renderPortfolioPage('workAudi', 'workLookUp'));
      samsungCta.addEventListener('click', () => window.renderPortfolioPage('workSamsung', 'workLookUp'));
      workNavLeft.addEventListener('click', () => workNavClick('left'));
      workNavRight.addEventListener('click', () => workNavClick('right'));

      renderWorkPage();
    }

    // declare that that the work page has loaded,
    // voiding the need to reload it.
    workPageHasLoaded = true;
  }
  else {
    renderWorkPage();
  }

  /**
   * close a portfolio
   */
  function closePortfolio() {
    workTl.set(
      [closePortBtn, workDownArrow],
      {visibility: 'hidden', opacity: 0}
    );
    hidePages();
    shiftSubNav(true);
    navVisibility(null, true);
    window.apiCollection.handlePageTransitions(
      currentPortfolio,
      () => renderContent(currentPortfolio, 'subPage')
    );
  }

  function workNavClick(direction) {
    const subpageIndex = portfolioPages.indexOf(workCurrentSubpage);
    const cycleToPage = direction === 'left' ?
      cycleLeft(subpageIndex, portfolioPages) :
      cycleRight(subpageIndex, portfolioPages);

    hidePages();

    window.apiCollection.handlePageTransitions(
      cycleToPage,
      () => renderContent(cycleToPage, 'subPage')
    );
    shiftSubNav(true);
  };

  function cycleLeft(index, arr) {
    return index === 0 ? arr[arr.length - 1] : arr[index - 1];
  }

  function cycleRight(index, arr) {
    return index === arr.length - 1 ? arr[0] : arr[index + 1];
  }

  function hidePages() {
    const subpages =
      Object.keys(loadedSubpages).map(subpage => loadedSubpages[subpage]);

    const portfolios =
      Object.keys(loadedPortfolios).map(port => loadedPortfolios[port]);

    if (!subpages || !portfolios) return;

    workTl.to([subpages, portfolios], .5, {opacity: 0})
    workTl.set([subpages, portfolios], {display: 'none'})
  }

  function shiftSubNav(willRender) {
    willRender ?
      workNav.classList.add('set-subnav') :
      workNav.classList.remove('set-subnav');
  }

  function renderContent(page, type) {
    let contentModel;
    let hasUIScaffold = false;
    
    // set the current sub-page to this page
    workCurrentSubpage = page;
    
    // if the page is being called for the first time, async load it
    if (!Object.keys(loadedSubpages).includes(page)) {
      const subPageEl = document.querySelector(`.work-sub-page-${page}`);
      workTl.to([workNavArrows], .5, {display: 'flex', opacity: 1});

      // add the El to the loadedSubpages
      loadedSubpages[page] = subPageEl;
    }
    switch (type) {
      case 'subPage':
        // reveal the sub-page
        workTl.to(loadedSubpages[page], .5, {display: 'block', opacity: 1, visibility: 'visible'});
        break;
      case 'portfolio':
        // set the current portfolio to this page
        currentPortfolio = page;
        contentModel = loadedPortfolios;
        hasUIScaffold = true;

        if (Object.keys(contentModel).includes(page)) {
          // reveal the portfolio page
          workTl.to(
            closePortBtn,
            .5, {display: 'flex', visibility: 'visible', opacity: 1});

          workTl.to(
            [contentModel[page], workDownArrow],
            .5, {display: 'block', opacity: 1});
        } else {
          loadPage(page, type, hasUIScaffold);
        }
        break;
    }
  }

  function loadPage(page, type, hasUIScaffold = false) {
    let folderName;
    let pageType;

    switch (type) {
      case 'subPage':
        folderName = 'subPages'
        pageType = 'Subpage'
        break;
      case 'portfolio':
        folderName = 'portfolio'
        pageType = 'Portfolio'
        break;
    }

    if (hasUIScaffold) drawScaffoldOutline();

    window.apiCollection.loadStyles(`${workPath}/${folderName}/${page}.css`)
    window.apiCollection.loadScript(`${workPath}/${folderName}/${page}.js`)
    .then(() => {
      // inject the portfolio component into the work container
      workContainer.insertAdjacentHTML(
        'beforeend', window[`${page}${pageType}`]().getView()
      );

      // register the loaded portfolio
      loadedPortfolios[page] =
          workContainer.querySelector(`.work-portfolio-${page}`);
      loadedModel = loadedPortfolios[page];
      loadedModel.contentHasLoaded = true;

      // reveal the selected page if the scaffold outline animation concluded
      if (outlineHasDrawn || !hasUIScaffold) {
        workTl.to(loadedModel, .5, {display: 'block', opacity: 1});
        workTl.set(
          [closePortBtn, workDownArrow],
          {visibility: 'visible', display: 'flex', opacity: 1}
        );
      }
    })
  }

  window.renderPortfolioPage = (name, movementOption) => {
    navVisibility(name, false);
    window.apiCollection.handlePageTransitions(
      movementOption ? movementOption : `${name}`,
      () => renderContent(`${name}`, 'portfolio')
    );
  }

  function drawScaffoldOutline(duration = 2000) {
    workTl.set(
      portfolioUiScaffold,
      { display: 'block', transition: `${duration}s` }
    );

    // set a 'x'(duration) second timer for the portfolioUiScaffold loader
    // flip a flag when the timer is complete
    setTimeout(() => {
      outlineHasDrawn = true;

      // if the details page has loaded, reveal it and hide the scaffold
      if (loadedModel) {
        workTl.set(portfolioUiScaffold, {display: 'none'});
        workTl.to(loadedModel, .5, {display: 'block', opacity: 1});
        workTl.to(
          [closePortBtn, workDownArrow], .5,
          {visibility: 'visible', display: 'flex', opacity: 1}
        );

        // reset the value ot the loadedModel
        loadedModel = null;
      }
    }, duration);
  }

  function navVisibility(name, isVisible) {
    if (isVisible) {
      workTl.to([loadedSubpages[name], workNav], .75, {opacity: 1});
    } else {
      workTl.to([loadedSubpages[name], workNav], .75, {opacity: 0})
    }
  }

  // fade in the UI
  function renderWorkPage() {
    workContainer.style.opacity = 1;
    workContainer.style.visibility = 'visible';
  }

  function scrollDownPage(el) {
    var scrollEl = workContainer.querySelector(`.${el}`);
    // apply an event listener to the arrows
    scrollEl.scrollTo({
      top: window.innerHeight - 100,
      left: 0,
      behavior: 'smooth'
    });
  }

  // make the functions below public
  return {
    scrollDownPage,
    closePortfolio
  }
}