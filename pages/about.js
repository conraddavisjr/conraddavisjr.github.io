let aboutPageHasLoaded = false;
let aboutContainer = 'about-container';
let aboutBioContainer;
let aboutScrollArrow;
let aboutNavName = 'about-nav';
let aboutPath = 'pages/about';
let aboutNav;
let aboutEffectsBorder;
let aboutEffectsFill;
let aboutLoadedSubpages = {};
let lastScrollTop = 0;
const aboutTl = new TimelineLite();

const animationGraph = {
  skills: {
    targetCoords: {x: -23.7, y: 20.72, z: 8.8, rx: 0, ry: -4.7, rz: 0},
    timing: 2000,
    delay: 1000
  }
}

function aboutPage(uiPanel, apiCollection, scene, camera) {
  // if the page hasn't loaded yet, populate it in the DOM
  if(!aboutPageHasLoaded) {

    // load ui template styles, then build the view
    apiCollection.loadStyles(`${aboutPath}/styles.css`).then(buildUI());

    // loadObject('models/about_section.obm', scene);

    function buildUI() {
      // generate ui template
      let interfaceUI = `
        <div class="${aboutContainer}">
          <div class=${aboutNavName}>
            <div class="nav-about-skills"> <span>Skills</span> </div>
            <div class="nav-about-bio"> <span>Bio</span> </div>
          </div>
        </div>
      `;

      uiPanel.insertAdjacentHTML('afterbegin', interfaceUI);
      mountInterface();
    }

    function mountInterface() {
      aboutContainer = document.querySelector(`.${aboutContainer}`);
      aboutNav = document.querySelector(`.${aboutNavName}`);
      let aboutButton = document.querySelector('.about-button');
      let skillsBtn = document.querySelector('.nav-about-skills');
      let bioBtn = document.querySelector('.nav-about-bio');

      aboutButton.addEventListener('click', () => {
        // set the current sub-page to this page
        window.currentSubpage = null;
        hideSubpages();
        renderSubNav(false);
      });

      skillsBtn.addEventListener('click', () => {
        if (pageAlreadySelected('skills')) return;

        hideSubpages();

        apiCollection.handlePageTransitions(
          'aboutSkills',
          () => renderSubPage('skills')
        );
        renderSubNav(true);
        setActiveNavItem(skillsBtn);
      });

      bioBtn.addEventListener('click', () => {
        if (pageAlreadySelected('bio')) return;

        hideSubpages();

        apiCollection.handlePageTransitions(
          'aboutBio',
          () => renderSubPage('bio')
        );
        renderSubNav(true);
        setActiveNavItem(bioBtn);
      });

      renderAboutPage();
    }

    function pageAlreadySelected(page) {
      return page == window.currentSubpage;
    }

    function renderSubNav(willRender) {
      willRender ?
        aboutNav.classList.add('set-subnav') :
        aboutNav.classList.remove('set-subnav');
    }

    function renderSubPage(page) {
      // set the current sub-page to this page
      window.currentSubpage = page;

      if (Object.keys(aboutLoadedSubpages).includes(page)) {
        // reveal the sub-page
        // if the page is skills, set custom animation
        if (page == 'skills') {
          skillsPageAnimation(page);
        } else {
          aboutTl.to(
            aboutLoadedSubpages[page], .5,
            {display: 'block', opacity: 1}
          );
        }

      } else {
        loadPage(page);
      }
    }

    function loadPage(page) {
      apiCollection.loadStyles(`${aboutPath}/subpages/${page}.css`)
      apiCollection.loadScript(`${aboutPath}/subpages/${page}.js`)
      .then(() => {
        // inject the sub-page component into the about container
        aboutContainer.insertAdjacentHTML(
          'beforeend', window[`${page}Subpage`]()
        );

        // register the loaded sub-page
        aboutLoadedSubpages[page] =
            aboutContainer.querySelector(`.about-sub-page-${page}`);

        if (window.currentSubpage == 'bio') {
          aboutBioContainer = document.querySelector('.about-sub-page-bio');
          aboutScrollArrow = aboutBioContainer.querySelector('.about-down-arrow');
          initBioContainerScrollEffect();
          setScrollArrowTimer();
          setScrollArrowBehavior();
        };

        if (page == 'skills') {
          aboutEffectsBorder = 
              aboutLoadedSubpages[page].querySelector('.about-effects-border');
          aboutEffectsFill =
              aboutLoadedSubpages[page].querySelector('.about-effects-fill');
          skillsContent =
              aboutLoadedSubpages[page].querySelector('.skills-content');

          skillsPageAnimation(page);
        } else {
          // reveal the sub-page
          aboutTl.to(
            aboutLoadedSubpages[page], .5,
            {display: 'block', opacity: 1}
          );
        }
      })
    }

    function hideSubpages() {
      const subpages =
          Object.keys(aboutLoadedSubpages)
                .map(subpage => aboutLoadedSubpages[subpage]);

      if (!subpages) return;

      aboutTl.to(subpages, .5, {opacity: 0})
      aboutTl.set(subpages, {display: 'none'})
    }

    function setActiveNavItem(item) {
      Array.from(aboutNav.children).forEach(
        (item) => item.classList.remove('active')
      )
      item.classList.add('active');
    }

    // declare that that about page has loaded,
    // voiding the need to reload it.
    aboutPageHasLoaded = true;
  }
  else {
    renderAboutPage();
  }

  function skillsPageAnimation(page) {
    // get the diameter of the fill circle
    // then figure the difference from the window dimensions
    // and calculate scale value

    const circleDiameter =
        aboutEffectsFill.clientWidth - (aboutEffectsFill.clientWidth / 4);

    const largerWindowDim = window.innerWidth > window.innerHeight ?
      window.innerWidth : window.innerHeight;

    const scaleValue = largerWindowDim / circleDiameter;

    // Intro animation for the skill section
    // 
    // reveal the skills page container
    aboutTl.to(
      aboutLoadedSubpages[page], .5,
      {display: 'block', opacity: 1}
    )
    // pulse the circle border
    .to(
      aboutEffectsBorder, 1,
      {scale: 3, borderWidth: '1px', opacity: 0}, '-=.5'
    )
    // scale the circle to a fullscreen takeover
    .to(
      aboutEffectsFill, 1,
      {scale: scaleValue, ease: Back.easeIn.config(.7)}, '-=1'
    )
    // make the skills container scrollable and fullscreen
    .set(
      aboutLoadedSubpages[page],
      {
        overflow: 'scroll',
        width: `100vw`,
        height: `100vh`,
        backgroundColor: 'white'
      }
    )
    // fade out the circle fill
    .to(
      aboutEffectsFill, .3,
      {opacity: 0}
    )
    // remove the about effects border and fill
    .set(
      [aboutEffectsBorder, aboutEffectsFill],
      {display: 'none'}
    )
    // reveal the skills page content
    .set(
      skillsContent,
      {opacity: 1}
    )
  }

  function fadeIn() {
    aboutContainer.style.opacity = 1;
    aboutContainer.style.visibility = 'visible';
  }
  // fade in the UI
  function renderAboutPage() {
    // fade in the UI
    setTimeout(fadeIn, 50);
  }

  function initBioContainerScrollEffect() {
    // watch scroll events on the about container
    aboutBioContainer.addEventListener('scroll', (e) => {
      let st = e.target.scrollTop;
      let scrollVal = 0.001;
      const camYMax = 4.71;
      const camYMin = 4.56;

      if (st > lastScrollTop && st > 0 && camera.rotation.y < camYMax) {
        // scrolling down
        camera.rotation.y += scrollVal;
      }
      else {
        camera.rotation.y -= scrollVal * 1.1;
      }
      // else if (camera.rotation.y > camYMin) {
      //   // scrolling up

      //   camera.rotation.y -= scrollVal * 1.6;
      // }
      lastScrollTop = st;
    });
  }

  function setScrollArrowTimer() {
    let playState = true;

    setInterval(() => {
      if (playState) {
        aboutScrollArrow.style.animationPlayState = 'paused';
        playState = false
      } else {
        aboutScrollArrow.style.animationPlayState = 'running';
        playState = true
      }
    }, 5000)
  }

  function setScrollArrowBehavior() {
    // listen for clicks
    aboutScrollArrow.addEventListener('click', () => {
      aboutBioContainer.scrollTo({
        top: window.innerHeight - 270,
        left: 0,
        behavior: 'smooth'
      });
    })

    // on scroll, incrementally hide the scroll arrow
    aboutBioContainer.addEventListener('scroll', () => {
      let aboutScrollTop = aboutBioContainer.scrollTop;

      if (aboutScrollTop < 40) {
        let opacityInt = Number(aboutScrollArrow.style.opacity);
        aboutScrollArrow.style.opacity = (opacityInt + .1);
      } else if (aboutScrollTop > 40 && aboutScrollArrow.style.opacity >= 0) { 
        aboutScrollArrow.style.opacity -= .1;
      }

      if (aboutScrollTop == 0) {
        aboutScrollArrow.style.opacity = 1;
      }
    })
  }
}