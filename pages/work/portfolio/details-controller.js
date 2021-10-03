// this file handles all of the query selectors
// and functional logic for the portfolio details

let portfolioDetails = workContainer.querySelector('.portfolio-details');
let hero = portfolioDetails.querySelector('.portfolio-details__hero');
let utilBar = portfolioDetails.querySelector('.portfolio-details__util-bar');
let extraContributionsBtn = workContainer.querySelector('.extra-contributions');
let foldContent = portfolioDetails.querySelector('.portfolio-details__fold-content');
let additionalDetails = workContainer.querySelector('.additional-details');
let detailsBackButton = workContainer.querySelector('.details-back-button');

let detailIsOpen = false;

// listen to clicks on the contributionList component
extraContributionsBtn.addEventListener('click', openTechDetails);
// listen to clicks on the hero component button
hero.addEventListener('click', closeTechDetails);
detailsBackButton.addEventListener('click', closeTechDetails);

// fold back the hero banner, slide out the below-fold content,
// and slide in the tech/contribution details
function openTechDetails() {
	detailIsOpen = true;

	let tl = new TimelineLite();
	let duration = .5;
	let easing = Power2.easeOut;

	// hide the closeWorkBtn
	tl.set(closeWorkBtn, {display: 'none'})
	// render the background overlay and
	// the shadow layer on the hero element
	tl.call(() => {
		portfolioDetails.classList.add('show-bg');
		hero.classList.add('shadow-layer');
	})
	// 3d rotate the hero module on the X axis
	tl.to(hero, duration, {rotationX: -49, easing}, 0)
	// slide the util bar and fold content down
	tl.to([utilBar, foldContent], duration, {y: '+=30vh'}, 0)
	// slide the additional details in
	tl.to(additionalDetails, duration, {y: '15.5vh', easing}, `-=${duration / 2}`)
}

// return the hero banner to a flat angle, slide out the tech/contribution details
// slide in the below-fold content
function closeTechDetails() {
	if (!detailIsOpen) return;
	detailIsOpen = false;

	let tl = new TimelineLite();
	let duration = .5;
	let easing = Power2.easeOut;

	// reveal the closeWorkBtn
	tl.set(closeWorkBtn, {display: 'block'})
	// render the background overlay and
	// the shadow layer on the hero element
	tl.call(() => {
		portfolioDetails.classList.remove('show-bg');
		hero.classList.remove('shadow-layer');
	})
	// rotate the hero module back to 2d
	tl.to(hero, duration, {rotationX: 0, easing}, 0)
	// slide the additional details out
	tl.to(additionalDetails, duration, {y: '500vh', easing}, 0)
	// slide the util bar and fold content back up
	tl.to([utilBar, foldContent], duration, {y: '-=30vh'}, 0)
}
