export default function postLoad(webgl, loaderTakover, initialNav, getSvgDimensions, svgGridContainer) {
  let tl = new TimelineLite();
  let loadIcon = document.querySelector('.load-icon');
  let html = document.querySelector('html');
  let loadIconDim = getSvgDimensions(loadIcon);
  let {cx, cy} = loadIconDim;

  // set the full screen dimensions for the circle
  let circleFsDim = window.largestWinDim + (window.largestWinDim * .5);

  // bring all circles to the center
  tl.staggerTo(window.loaderIconItems, 0.3, {attr:{cx, cy}, fill: 'black'}, 0.1, '+=.5')
  // render the circle takeover
  tl.set(loaderTakover, {display: 'block'}, '-=0.5')
  // remove the svg circles
  tl.set(window.loaderIconItems, {display: 'none'}, '-=0.1')
  // make the loaderTakover go fullscreen
  tl.to(loaderTakover, 1, {width: circleFsDim, height: circleFsDim, ease: Back.easeIn.config(0.5)}, '-=0.1')
  // render the webgl world to the DOM
  tl.set(webgl, {display: 'block'})
  // set a gradient color to the BG
  tl.set(html, {backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #83b5de 32%, #628db1 55%, #193656 100%)"})
  // hide the SVG grid
  tl.set(svgGridContainer, {display: 'none'})
  // fade out the loaderTakeover
  tl.to(loaderTakover, 3, {opacity: 0})

  // trigger the callback to move to the initially selected page
  tl.call(initialNav, null, null, '-=2');
}