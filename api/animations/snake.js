import gatherGridItems from '../helpers/gatherGridItems.js';
let tl = new TimelineLite();

export default function snake(svgGridItems, cb) {

	if (svgGridItems) {
		// set mapping for the grid items, 'r' stands for row
		let easing = Power1.easeInOut;
		let snakeFill = '#8d4411';
		let snakeStroke = '73310e';
		let appleFill = '#870f0f';
		let appleStroke = '#000';

		let snakeStyles = {
			fill: snakeFill,
			stroke: snakeStroke
		}

		let appleStyles = {
			fill: appleFill,
			stroke: snakeStroke
		}

		// set a mapping for the snake path, st is 'snakeTrail'
		let st1 = [
			7, 16, 18, 25, 19, 20, 100, 101, 90, 102, 91, 92
		]
		let st2 = [
			93, 103, 104, 106, 117, 118, 127, 126, 135
		]
		let st3 = [
			136, 137, 138, 129, 130, 131, 132, 133, 147, 153, 152
		]
		let st4 = [
			150, 149, 156, 162, 163, 267, 258
		]
		let st5 = [
			259, 260, 270, 271, 272, 273, 264, 262, 266
		]

		// gather all of the items for the snake trail upfront
		st1 = gatherGridItems(st1, svgGridItems);
		st2 = gatherGridItems(st2, svgGridItems);
		st3 = gatherGridItems(st3, svgGridItems);
		st4 = gatherGridItems(st4, svgGridItems);
		st5 = gatherGridItems(st5, svgGridItems);

		let duration = 0.2;
		let delay = `-=${duration - 0.5}`;

		function screenFlash(nextScene, excludeList) {
			let tl = new TimelineLite();
			let bgItems = getBgItems(325, excludeList)

			// flash one
			tl.to(excludeList, 0.1, {fill: 'green'}, 'flashOne')
			tl.to(bgItems, 0, {fill: 'tan'}, 'flashOne')
			// flash two
			tl.to(excludeList, 0, snakeStyles, 'flashOne+=0.2')
			// back to original
			tl.to(excludeList, 0.1, {fill: 'orange'}, 'flashOne+=0.4')
			tl.to(bgItems, 0, {fill: '#1c1c1c'}, 'flashOne+=0.5')
			tl.to(excludeList, 0, snakeStyles, 'flashOne+=0.5')

			// continue sequence if there is one following
			if(nextScene) {
				tl.call(nextScene, null, null, '-=0.2');
			}
		}

		// gather all of the background svg items, by excluding
		// the items that are used to make the snake
		function getBgItems(totalItems, excludeList) {
			// build an array from one to the totalItems value
			// omit the numbers from the exclude list
			let backgroundItems = [];
			let i = 1;
			while(i <= totalItems) {
				if(excludeList.indexOf(i) > -1) {
					i++;
					continue;
				} else {
					backgroundItems.push(i)
				}
				i++;
			}
			backgroundItems = gatherGridItems(backgroundItems, svgGridItems);
			return backgroundItems;
		}

		function placeApple(itemId) {
			tl.to(gatherGridItems([itemId], svgGridItems), duration, appleStyles, delay)
		}

		function scene2() {
			// drop the apple on the map
			placeApple(135);
			tl.staggerTo(st2, duration, snakeStyles, 0.3, delay, screenFlash, [scene3, st1.concat(st2)])
		}

		function scene3() {
			// drop the apple on the map
			placeApple(152);
			tl.staggerTo(st3, duration, snakeStyles, 0.3, delay, screenFlash, [scene4, st1.concat(st2, st3)])
		}

		function scene4() {
			// drop the apple on the map
			placeApple(258);
			tl.staggerTo(st4, duration, snakeStyles, 0.3, delay, screenFlash, [scene5, st1.concat(st2, st3, st4)])
		}

		function scene5() {
			// drop the apple on the map
			placeApple(266);
			tl.staggerTo(st5, duration, snakeStyles, 0.3, delay, screenFlash, [null, st1.concat(st2, st3, st4, st5)])
		}

		// drop the first apple apple one
		placeApple(92);
		// move snake to apple then screen flash
		tl.staggerTo(st1, duration, snakeStyles, 0.3, delay, screenFlash, [scene2, st1])
	}

	function pauseAnimation() {
		tl.pause();
	}

	return {
		pauseAnimation
	}
}