import gatherGridItems from '../helpers/gatherGridItems.js';
let tl = new TimelineLite();

export default function mountains(svgGridItems, cb) {

	if (svgGridItems) {
		// set mapping for the grid items, 's' stands for scene
		let easing = Circ.easeIn;
		let easingWater = Elastic.easeIn.config(1, 0.3);
		let strokeColor = 'rgb(0, 0, 0)'

		let mountain = {
			styles: {fill: '#56452b', ease: easing, stroke: strokeColor},
			items: [
				108, 109, 107, 96, 97, 110, 98, 104, 106, 113,
				103, 111, 112, 114, 105, 100, 93, 99, 89, 85,
				95, 27, 20, 19, 183, 184, 177, 185, 186, 187,
				188, 189, 190
			]
		}
		let mountainR1 = {
			styles: {fill: '#5e5d5c', ease: easing, stroke: strokeColor},
			items: [
				16, 7, 22, 29, 28, 47, 46, 55, 54, 64, 71, 50
			]
		}
		let mountainR2 = {
			styles: {fill: '#5b5653', ease: easing, stroke: strokeColor},
			items: [
				72, 65, 56, 57
			]
		}
		let mountainR3 = {
			styles: {fill: '#4c4b4b', ease: easing, stroke: strokeColor},
			items: [
				48, 49, 15, 21
			]
		}
		let mountainR4 = {
			styles: {fill: '#666462', ease: easing, stroke: strokeColor},
			items: [
				51
			]
		}
		let valleyR1 = {
			styles: {fill: '#5d8c3e', ease: easing, stroke: strokeColor},
			items: [
				79, 161, 173, 169, 171, 172, 174, 167, 168, 170,
				166, 165, 289, 276, 277, 300, 278, 290, 301, 291,
				279, 292, 303, 302, 304, 314, 305, 315, 316, 306,
				307, 317, 318, 308, 297, 309, 319, 320, 321, 311,
				324, 325, 323, 312, 322, 299, 313, 310
			]
		}
		let valleyR2 = {
			styles: {fill: '#4f7f30', ease: easing, stroke: strokeColor},
			items: [
				162, 163, 164, 157, 141, 140, 142, 139, 136,
				137, 138, 241, 139, 251, 259, 242, 258, 267,
				253, 252, 260, 280, 271, 254, 261, 262, 246,
				247, 256, 263, 273, 285, 296, 293, 52, 53,
				134, 135, 270, 281, 294, 295, 283, 269, 282,
				284, 272, 264, 274, 286, 298, 287, 288, 275,
				248, 249, 257, 265, 266, 245, 255, 268, 250
			]
		}
		let valleyR3 = {
			styles: {fill: '#477728', ease: easing, stroke: strokeColor},
			items: [
				158, 159, 152, 153, 154, 212, 134,
				135, 141, 219, 225, 232, 233, 226, 234,
				235, 227, 220, 243, 236, 237, 244, 238
			]
		}
		let valleyR4 = {
			styles: {fill: '#3c6d1d', ease: easing, stroke: strokeColor},
			items: [
				131, 132, 130, 129, 147, 128, 127, 126, 125, 198,
				199, 204, 42, 33, 32, 206, 205, 213, 207, 214, 22,
				213, 221, 228, 222, 44, 43, 31, 41, 40, 30, 215, 208,
				207, 209, 210, 216, 230, 239, 224, 231, 240, 217, 218,
				211, 223, 229
			]
		}
		let valleyR5 = {
			styles: {fill: '#2f5e10', ease: easing, stroke: strokeColor},
			items: [
				120, 119, 118, 122, 117, 116, 121, 115, 124, 26, 35,
				191, 192, 200, 193, 194, 201, 195, 196, 203, 202, 197,
				25, 34, 24, 18, 23, 38, 39, 37, 36, 45
			]
		}
		let riverR1 = {
			styles: {fill: '#3786a5', ease: easingWater, stroke: strokeColor},
			items: [
				149, 143
			]
		}
		let riverR2 = {
			styles: {fill: '#367fa3', ease: easingWater, stroke: strokeColor},
			items: [
				148, 155, 156, 160, 63, 70, 62, 61, 70, 69, 60, 68,
				59, 78, 58, 66, 74, 67, 76, 77, 78, 73, 75
			]
		}
		let riverR3 = {
			styles: {fill: '#266c82', ease: easingWater, stroke: strokeColor},
			items: [
				144, 150
			]
		}
		let riverR4 = {
			styles: {fill: '#20647f', ease: easingWater, stroke: strokeColor},
			items: [
				151
			]
		}
		let riverR5 = {
			styles: {
				fill: '#1c5d77',
				ease: easingWater,
				stroke: strokeColor
			},
			items: [
				145, 146, 133, 123
			]
		}

		let duration = 2;
		let staggerDur = 0.1

		// mountain
		tl.staggerTo(
			gatherGridItems(
				mountain.items,
				svgGridItems
			), duration, mountain.styles, staggerDur, 0)

		tl.staggerTo(
			gatherGridItems(
				mountainR1.items,
				svgGridItems
			), duration, mountainR1.styles, staggerDur, 0)

		tl.staggerTo(
			gatherGridItems(
				mountainR2.items,
				svgGridItems
			), duration, mountainR2.styles, staggerDur, 0)

		tl.staggerTo(
			gatherGridItems(
				mountainR4.items,
				svgGridItems
			), duration, mountainR4.styles, staggerDur, 0)

		tl.staggerTo(
			gatherGridItems(
				mountainR3.items,
				svgGridItems
			), duration, mountainR3.styles, staggerDur, 0)

		// valley
		tl.staggerTo(
			gatherGridItems(
				valleyR1.items,
				svgGridItems
			), duration-1, valleyR4.styles, staggerDur - 0.05, 0)

		tl.staggerTo(
			gatherGridItems(
				valleyR2.items,
				svgGridItems
			), duration-1, valleyR2.styles, staggerDur - 0.05, 0)

		tl.staggerTo(
			gatherGridItems(
				valleyR3.items,
				svgGridItems
			), duration, valleyR3.styles, staggerDur - 0.05, 0)

		tl.staggerTo(
			gatherGridItems(
				valleyR4.items,
				svgGridItems
			), duration-1, valleyR4.styles, staggerDur - 0.05, 0)

		tl.staggerTo(
			gatherGridItems(
				valleyR5.items,
				svgGridItems
			), duration, valleyR5.styles, staggerDur - 0.05, 0)

		tl.staggerTo(
			gatherGridItems(
				valleyR5.items,
				svgGridItems
			), duration, valleyR5.styles, staggerDur, 0)

		// river
		tl.staggerTo(
			gatherGridItems(
				riverR1.items,
				svgGridItems
			), duration, riverR1.styles, staggerDur, 4)

		tl.staggerTo(
			gatherGridItems(
				riverR2.items,
				svgGridItems
			), duration, riverR2.styles, staggerDur, 4)

		tl.staggerTo(
			gatherGridItems(
				riverR3.items,
				svgGridItems
			), duration, riverR3.styles, staggerDur, 4)

		tl.staggerTo(
			gatherGridItems(
				riverR4.items,
				svgGridItems
			), duration, riverR4.styles, staggerDur, 4)

		tl.staggerTo(
			gatherGridItems(
				riverR5.items,
				svgGridItems
			), duration, riverR5.styles, staggerDur, 4, completeAnimation)

		function completeAnimation() {
			setTimeout(cb, 4000)
		}
	}

	function pauseAnimation() {
		tl.pause();
	}

	return {
		pauseAnimation
	}
}