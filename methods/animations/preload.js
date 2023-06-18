import gatherGridItems from '../helpers/gatherGridItems.js';

export default function preLoadAnimation(loadIconSvg, svgGridItems) {
  let tl = new TimelineLite();
  let html = document.querySelector('html');
  let preLoadComplete = new Event('preLoadComplete');
  let duration = 1.5;

  // gather all of the svg items
  function getSvgItems(totalItems) {
    // build an array from one to the totalItems value
    // omit the numbers from the exclude list
    let svgItems = [];
    let i = 1;
    while(i <= totalItems) {
      svgItems.push(i)
      i++;
    }
    svgItems = gatherGridItems(svgItems, svgGridItems);
    return svgItems;
  }

  // change the BG color to white
  tl.set(html, {backgroundColor: 'white'}, 0)
  // fade the svg grid to white
  tl.to(getSvgItems(325), duration, {fill: 'white', stroke: 'white'})
  // bring the load icon in
  tl.to(loadIconSvg, duration / 2, {scale: 1, opacity: 1})
  tl.call(() => window.dispatchEvent(preLoadComplete))
}