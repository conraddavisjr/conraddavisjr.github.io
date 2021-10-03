function workSamsungPortfolio() {
	function getView() {
		const portName = 'work-portfolio-workSamsung';
		const winWidth = window.innerWidth;
		const size = winWidth > 750 ? 'L' : 'S';
		return `
			<div class="portfolio-details ${portName}">

				<div class="portfolio-details__hero img-loading">
					<div class="constraint portfolio-details__port-title samsung-title">
						<h1>Samsung</h1>
						<h3>Gear S2 - Campaign website</h3>
					</div>
					<img onload="imageLoaded(event)" src="pages/work/img/samsung-hero_${size}.jpg">
				</div>

				<svg class="work-down-arrow" onclick="workPage().scrollDownPage('${portName}')" viewBox="0 0 24 24">
					<path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
					<path fill="none" d="M0 0h24v24H0z"/>
				</svg>

				<div class="constraint portfolio-details__page-content">
					<div class="portfolio-details__util-bar">
						<div class="summary-content">
							<div class="portfolio-details__contributions">
								<div class="contribution-title">My contributions</div>
								<div class="contribution-list">
									<div>Project lead</div>
									<div>Rapid Prototyping</div>
									<div>Animation</div>
								</div>
							</div>
							<div class="portfolio-details__tech">
								<div class="tech-list-title">Software</div>
								<div class="tech-list">
									<div class="javascript">
										<div class="icon javascript-icon"></div> Javascript
									</div>
									<div class="scrollmagic">
										<div class="icon scrollmagic-icon"></div> Scrollmagic
									</div>
									<div class="gsap">
										<div class="icon gsap-icon"></div> GSAP
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="portfolio-details__fold-content">
						<h2>Rapid delivery</h2>
						<p>
							Samsung is a global force with a myriad of products and services
							constantly released to consumers around the world. Serving as a front-end engineer
							on their marketing team meant providing complete SPAs on extremely short deadlines
							sometimes within days.
						</p>

						<div class="portfolio-details__images-container">
							<div class="portfolio-details__content-image port-content-img-left img-loading">
								<div class="portfolio-details__content-image-header">Color preview</div>
								<img onload="imageLoaded(event)" src="pages/work/img/SAMSUNG_Compare_${size}.gif">
							</div>
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Samsung Gallery</div>
								<img onload="imageLoaded(event)" src="pages/work/img/SAMSUNG_Personalize_${size}.gif">
							</div>
						</div>
					</div>

					<div class="close-portfolio-detail" 
							 onclick="workPage().closePortfolio()">Back to work overview</div>

				</div>

			</div>
		`;
	}

	return {
		getView
	}
}