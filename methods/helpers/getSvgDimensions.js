export default function getSvgDimensions(svg) {
	let bb = svg.getBBox();
  let bbx = bb.x;
  let bby = bb.y;
  let bbw = bb.width;
  let bbh = bb.height;
  //---center of path---
  let cx = bbx + .5 * bbw;
  let cy = bby + .5 * bbh;

  return {
  	bb,
		bbx,
		bby,
		bbw,
		bbh,
		cx,
		cy
  }
}