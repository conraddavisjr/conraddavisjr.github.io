import gatherGridItems from '../helpers/gatherGridItems.js';
let tl = new TimelineLite();

export default function linearGradient(svgGridItems, cb) {

	if (svgGridItems) {
		// set mapping for the grid items, 'r' stands for row
		let easing = Power1.easeOut;
		let strokeColor = 'white';

		let r1 = {
			styles: {fill: '#84f7ff', ease: easing, stroke: strokeColor},
			items: [
				71, 75, 76, 72, 73, 77, 78, 68, 79,
				165, 168, 166, 169, 167, 170, 172,
				301, 316, 324, 325, 64, 65, 56, 66,
				74, 67, 59, 60, 69, 160, 161
			]
		}

		let r2 = {
			styles: {fill: '#80ecff', ease: easing, stroke: strokeColor},
			items: [
				54, 55, 46, 45, 47, 48, 49, 57, 58,
				50, 51, 61, 70, 162, 163, 171, 173, 174,
				289, 300, 302, 314, 315, 317, 318, 319,
				320, 321, 322, 323, 267, 258, 268, 279, 292,
				276, 277, 278, 290, 291, 303, 304, 305, 293,
				306, 307, 308, 309, 310, 311, 312, 313, 298,
				299, 297, 286, 283, 282, 295
			]
		}

		let r3 = {
			styles: {fill: '#79dbff', ease: easing, stroke: strokeColor},
			items: [
				36, 37, 52, 62, 53, 63, 142, 148, 155, 156,
				149, 158, 157, 164, 251, 259, 252, 260, 269,
				261, 270, 280, 281, 294, 271, 262, 272, 284,
				296, 273, 285, 264, 274, 287, 275, 288, 265
			]
		}

		let r4 = {
			styles: {fill: '#73cdff', ease: easing, stroke: strokeColor},
			items: [
				28, 21, 38, 30, 31, 32, 39, 40, 41, 33, 42,
				43, 134, 135, 136, 137, 143, 144, 150,
				152, 159, 154, 212, 129, 225, 232, 233,
				241, 242, 234, 235, 243, 236, 244, 254, 245,
				246, 255, 247, 256, 248, 257, 266, 253, 263
			]
		}

		let r5 = {
			styles: {fill: '#6ec1ff', ease: easing, stroke: strokeColor},
			items: [
				44, 125, 126, 127, 128, 129, 138, 139, 145, 151, 153,
				204, 205, 214, 222, 215, 223, 224, 213, 220, 227, 228,
				221, 237, 238, 229, 239, 240, 250, 249, 219, 226
			]
		}

		let r6 = {
			styles: {fill: '#6ab6ff', ease: easing, stroke: strokeColor},
			items: [
				29, 22, 15, 7, 16, 23, 17, 18, 24, 34, 25, 26,
				35, 124, 118, 119, 120, 130, 121, 140, 141, 146,
				147, 198, 199, 206
			]
		}

		let r7 = {
			styles: {fill: '#66acff', ease: easing, stroke: strokeColor},
			items: [
				230, 231, 217, 216, 208, 209, 210, 218, 211, 202,
				203, 195, 196, 201, 207, 194, 193, 200, 192, 191,
				121, 108, 107, 117, 116, 115, 105, 27, 19, 131, 111
			]
		}

		let r8 = {
			styles: {fill: '#63a4ff', ease: easing, stroke: strokeColor},
			items: [
				8, 9, 10, 12, 13, 14, 20, 100, 101, 102, 103,
				104, 96, 109, 110, 11, 112, 122, 132, 133,
				123, 106
			]
		}

		let r9 = {
			styles: {fill: '#6498ff', ease: easing, stroke: strokeColor},
			items: [
				90, 91, 93, 95, 85, 97, 98, 99, 114, 113, 183,
				184, 185, 186, 187, 189, 190, 197
			]
		}

		let r10 = {
			styles: {fill: '#628ce8', ease: easing, stroke: strokeColor, onComplete: () => cb()},
			items: [
				1, 2, 3, 4, 5, 6, 80, 92, 81, 94, 82, 83, 84,
				86, 87, 88, 89, 175, 176, 177, 178, 179, 188,
				180, 181, 182
			]
		}

		// run the animation, fill coloring for the linear gradient
		let duration = 2;
		let delay = `-=${duration - 0.1}`;
		tl.to(gatherGridItems(r1.items, svgGridItems), duration, r1.styles)
		tl.to(gatherGridItems(r2.items, svgGridItems), duration, r2.styles, delay)
		tl.to(gatherGridItems(r3.items, svgGridItems), duration, r3.styles, delay)
		tl.to(gatherGridItems(r4.items, svgGridItems), duration, r4.styles, delay)
		tl.to(gatherGridItems(r5.items, svgGridItems), duration, r5.styles, delay)
		tl.to(gatherGridItems(r6.items, svgGridItems), duration, r6.styles, delay)
		tl.to(gatherGridItems(r7.items, svgGridItems), duration, r7.styles, delay)
		tl.to(gatherGridItems(r8.items, svgGridItems), duration, r8.styles, delay)
		tl.to(gatherGridItems(r9.items, svgGridItems), duration, r9.styles, delay)
		tl.to(gatherGridItems(r10.items, svgGridItems), duration, r10.styles, delay)
	}

	function pauseAnimation() {
		tl.pause();
	}

	return {
		pauseAnimation
	}
}