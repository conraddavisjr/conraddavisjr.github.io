/**
 * collect targeted items from the the svg grid
 * @param  {[type]} items [description]
 * @param  {[type]} items [description]
 * @return {[array]}       [a collection of svg elements]
 */
export default function gatherGridItems(items, svgGridItems) {
	let collection = [];
	items.forEach((item) => {
		collection.push(svgGridItems[`i_${item}`]);
	});
	return collection;
}