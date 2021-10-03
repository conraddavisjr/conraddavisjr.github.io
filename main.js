import loadScript from './api/load-script.js';
import svgGrid from './assets/svg/grid.js';
import loadIcon from './assets/svg/loadIcon.js';
import introAnimations from './api/intro-animations.js';
import preLoadAnimation from './api/animations/preload.js';
import postLoadAnimation from './api/animations/postload.js';
import updateLoadProgress from './api/animations/update-load-progress.js';
import getSvgDimensions from './api/helpers/getSvgDimensions.js';

/*
  state
 */
let webGLWorldLoaded = false;
let tl = new TimelineLite();
window.selectedPage;

/*
  query elements
 */
let title = document.querySelector('.title');
let nav = document.querySelector('nav');
let mainNavItems = nav.querySelectorAll('li');
let svgGridContainer = document.querySelector('.svg-grid-container');
let webgl = document.querySelector('#webgl');
let uiPanel = document.querySelector('.ui-panel');
let loaderTakeover = document.querySelector('.loader-takeover');

// insert the SVG grid into the DOM
svgGridContainer.insertAdjacentHTML('afterbegin', svgGrid);
svgGridContainer.insertAdjacentHTML('afterbegin', loadIcon);

// query all of the svg grid items
let svgGridContents = document.querySelector('.svg-grid-container #contents')
let svgGridItems = svgGridContents.children;
var svgGridEl = document.querySelector('.svg-grid')
let loadIconSvg = document.querySelector('.load-icon');

// start the intro animations
introAnimations(svgGridItems)

// listen to nav menu clicks
mainNavItems.forEach((item) => {
  item.addEventListener('click', (el) => {
    const pageName = el.target.className.replace('-button', '');
    runLoader(pageName, el);
  })
})


// get window dimensions on load
window.onload = handleWinAndSvgDimensions();

// get window dimensions on resize
window.addEventListener('resize', handleWinAndSvgDimensions)

function handleWinAndSvgDimensions() {
  setGreaterWinDim();
}

function setGreaterWinDim() {
  let winW = window.innerWidth;
  let winH = window.innerHeight;
  // assign these values to the window
  window.winW = winW;
  window.winH = winH;
  window.largerWinDim = winW > winH ? 'winW' : 'winH';
  window.largestWinDim = winW > winH ? winW : winH;
}

window.renderImg = function renderImg(e) {
  e.target.parentNode.classList = '';
}

// begin the loading process for the main experience
function runLoader(page, el) {
  setActiveNavState(el);
  if (webGLWorldLoaded) return;

  let fadeList = [
    title,
    nav
  ]
  // store the initially selected page on the window
  window.selectedPage = page;
  // disable and hide all fadeList elements
  tl.set(fadeList, {pointerEvents: 'none'})
  tl.to(fadeList, 0.5, {opacity: 0});
  // pause the intro animation
  introAnimations().pauseIntroAnimation();
  // run the pre loading world animation
  preLoadAnimation(loadIconSvg, svgGridItems);
  // listen for when the preload has completed, then load the webGL world
  window.addEventListener('preLoadComplete', () => loadWebglWorld(nav), false);
}

function setActiveNavState(el) {
  // clear all active items before setting the active class
  mainNavItems.forEach((item) => item.classList.remove('active'));
  el.target.classList.add('active');
}

// asynchronously load the 3d world and its dependencies
function loadWebglWorld(nav) {
	webGLWorldLoaded = true;
  // store the loadProgress function on the window
  window.updateLoadProgress = updateLoadProgress;
  // load the 3d world
  loadScript('webgl-world.js', true);

  // listen for when the WebglWorld has loaded
  window.addEventListener(
    'webGlLoaded',
    () => {
      postLoadAnimation(
        webgl,
        loaderTakeover,
        initialNav,
        getSvgDimensions,
        svgGridContainer
      ), false
    }
  );
}

function initialNav() {
  window.handlePageTransitions(window.selectedPage)
  // enable and reveal nav buttons
  tl.set(nav, {pointerEvents: 'auto'})
  tl.set(loaderTakeover, {display: 'none'})
  tl.fromTo(nav, 1.5, {opacity: 0, y: +50}, {opacity: 1, y: 0}, '+=1.5');
}

