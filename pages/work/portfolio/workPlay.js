function workPlayPortfolio() {
	function getView() {
		const portName = 'work-portfolio-workPlay';
		const winWidth = window.innerWidth;
		const size = winWidth > 750 ? 'L' : 'S';
		return `
			<div class="portfolio-details ${portName}">

				<div class="portfolio-details__hero img-loading">
					<div class="constraint portfolio-details__port-title g-play-title">
						<h1>Google Play</h1>
						<h3>Change the Game</h3>
					</div>
					<img onload="imageLoaded(event)" src="pages/work/img/ctg-hero_${size}.jpg">
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
									<div>Prototyping</div>
									<div>Framework architecture</div>
									<div>Animation</div>
									<div>Game development</div>
								</div>
							</div>
							<div class="portfolio-details__tech">
								<div class="tech-list-title">My tools</div>
								<div class="tech-list">
									<div class="javascript">
										<div class="icon javascript-icon"></div> Javascript
									</div>
									<div class="gsap">
										<div class="icon gsap-icon"></div> GSAP
									</div>
									<div class="scrollmagic">
										<div class="icon scrollmagic-icon"></div> Scrollmagic
									</div>
									<div class="phaser">
										<div class="icon phaser-icon"></div> Phaser
									</div>
									<div class="illustrator">
										<div class="icon illustrator-icon"></div> Illustrator
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="portfolio-details__fold-content">
						<h2>Leveling the playing field</h2>
						<p>
							I had the pleasure of being part of the design and
							development process for Google Play's CHANGE THE GAME,
							a campaign focused on supporting and bringing awareness to
							women in the gaming industry. We built a fully interactive world
							comprised of five levels which told the story of the female gamer's
							dilema of underrepresentation, facing sexism, and feeling apprehensive
							about expressing their interest in gaming.
						</p>
						<p>
							These dilemas were met with data showing that there is a 
							very large following of female gamers and that with suffient support,
							we could could connect female gamers with each other and help to change the
							narative of underrepresentation. 
						</p>

						<div class="portfolio-details__images-container">
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Cave world</div>
								<img onload="imageLoaded(event)" src="pages/work/img/CTG_Cave_${size}.gif">
							</div>
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Forest world</div>
								<img onload="imageLoaded(event)" src="pages/work/img/CTG_Forest_${size}.gif">
							</div>
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Ocean world</div>
								<img onload="imageLoaded(event)" src="pages/work/img/CTG_Sea_${size}.gif">
							</div>
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Castle world</div>
								<img onload="imageLoaded(event)" src="pages/work/img/CTG_Epilogue_${size}.gif">
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