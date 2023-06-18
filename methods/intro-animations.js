import linearGradient from './animations/linear-gradient.js';
import mountains from './animations/mountains.js';
import linearGradientToBlack from './animations/linear-gradient-to-black.js';

let animationIsPlaying = true;
let pointer = 0;

export default function introAnimations(svgGridItems) {
	let animationCollection = [
		linearGradient,
		mountains,
		linearGradientToBlack,
	];

	function playAnimation() {
		// guard against an empty row
		if (animationCollection[pointer] && animationIsPlaying) {
			// run the animation(s)
			animationCollection[pointer](svgGridItems, playAnimation)

			// increment the pointer
			if (pointer > animationCollection.length) {
				pointer = 0
			} else {
				pointer++;
			}
		}
	}

	// if the svgGridItems are provided, run the animations
	if (svgGridItems) playAnimation();

	function pauseIntroAnimation() {
		animationIsPlaying = false;
		animationCollection[pointer - 1]().pauseAnimation()
	}

	return {
		pauseIntroAnimation
	}
}