let tl = new TimelineLite();
let progressFill = 1;
let completeVal = 10;
window.loaderIconItems = [];
let loadingColors = [
	'#84f7ff',
	'#80ecff',
	'#79dbff',
	'#73cdff',
	'#6ec1ff',
	'#6ec1ff',
	'#6ec1ff',
	'#66acff',
	'#6498ff',
	'#628ce8'
];

export default function updateLoadProgress(count) {
	if (count) {
		let i = 0;
		while(i < count) {
			incrementProgressBar();
			i++
		}
	} else {
		incrementProgressBar();
	}

	function incrementProgressBar() {
		if (progressFill > completeVal) return;
		let item = `e_${progressFill}`;
		let svgItem = document.getElementById(item)
		let fillColor = loadingColors[progressFill - 1];

		window.loaderIconItems.push(svgItem);
		tl.set(svgItem, {fill: fillColor})
		progressFill += 1;
	}
}