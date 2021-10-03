import loadScript from './api/load-script.js';
import svgGrid from './assets/svg/grid.js';
import loadIcon from './assets/svg/loadIcon.js';
import gatherGridItems from './api/helpers/gatherGridItems.js';
import introAnimations from './api/intro-animations.js';
import preLoadAnimation from './api/animations/preload.js';
import postLoadAnimation from './api/animations/postLoad.js';
import updateLoadProgress from './api/animations/update-load-progress.js';
import getSvgDimensions from './api/helpers/getSvgDimensions.js';

/*
  state
 */
let webGLWorldLoaded = false;
let tl = new TimelineLite();
let selectedPage;
let canSetGreaterWinDim = true;

/*
  query elements
 */
let title = document.querySelector('.title');
let nav = document.querySelector('nav');
let homeButton = document.querySelector('.home-button');
let aboutButton = document.querySelector('.about-button');
let workButton = document.querySelector('.work-button');
let skillsButton = document.querySelector('.skills-button');
let svgGridContainer = document.querySelector('.svg-grid-container');
let webgl = document.querySelector('#webgl');
let uiPanel = document.querySelector('.ui-panel');
let loaderTakover = document.querySelector('.loader-takover');

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
homeButton.addEventListener('click', () => runLoader('home'));
aboutButton.addEventListener('click', () => runLoader('about'));
workButton.addEventListener('click', () => runLoader('work'));
skillsButton.addEventListener('click', () => runLoader('skills'));

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
function runLoader(page) {
  if (webGLWorldLoaded) return;
  let fadeList = [
    title,
    nav
  ]
  // store the initially selected page on the window
  selectedPage = page;
  // disable and hide all fadeList
  tl.set(fadeList, {pointerEvents: 'none'})
  tl.to(fadeList, 0.5, {opacity: 0});
  // pause the intro animation
  introAnimations().pauseIntroAnimation();
  // run the pre loading world animation
  preLoadAnimation(loadIconSvg, svgGridItems);
  // listen for when the proload has completed, then load the webGL world
  window.addEventListener('preLoadComplete', () => loadWebglWorld(nav), false);
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
        loaderTakover,
        initialNav,
        getSvgDimensions
      ), false
    }
  );
}

function initialNav() {
  window.handlePageTransitions(selectedPage)
  // enable and reveal nav buttons
  tl.set(nav, {pointerEvents: 'auto'})
  tl.set(loaderTakover, {display: 'none'})
  tl.fromTo(nav, 1.5, {opacity: 0, y: +50}, {opacity: 1, y: 0}, '+=1.5');
}

