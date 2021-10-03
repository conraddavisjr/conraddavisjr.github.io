function workGatherPortfolio() {
	function getView() {
		const portName = 'work-portfolio-workGather';
		const winWidth = window.innerWidth;
		const size = winWidth > 750 ? 'L' : 'S';
		return `
			<div class="portfolio-details ${portName}">

				<div class="portfolio-details__hero img-loading">
					<div class="constraint portfolio-details__port-title g-play-title">
						<h1>Google Gather</h1>
						<h3>Platform for Google events</h3>
					</div>
					<img onload="imageLoaded(event)" src="pages/work/img/gather-hero_${size}.jpg">
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
									<div>Custom component development</div>
									<div>CMS development</div>
									<div>Performance enhancements</div>
								</div>
							</div>
							<div class="portfolio-details__tech">
								<div class="tech-list-title">My tools</div>
								<div class="tech-list">
									<div class="javascript">
										<div class="icon javascript-icon"></div> Javascript
									</div>
									<div class="angular">
										<div class="icon angular-icon"></div> Angular
									</div>
									<div class="google">
										<div class="icon google-icon"></div> In-house Google tools
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="portfolio-details__fold-content">
						<h2>Thoroughly customizable & flexible </h2>
						<p>
              Google Gather is a globally used event hosting platform for Google products and services
              including Google Cloud, Chrome, Devfest and GML. My responsibilities as the
              Front-end project lead on Google Cloud and Google Chrome involved frequent U/X & UI strategies,
              architecture planning, and component development.
						</p>

						<div class="portfolio-details__images-container">
							<div class="portfolio-details__content-image port-content-img-left img-loading">
								<div class="portfolio-details__content-image-header">Serving a global audience</div>
								<img onload="imageLoaded(event)" src="pages/work/img/GATHER_Chrome_${size}.gif">
							</div>
							<div class="portfolio-details__content-image img-loading">
								<div class="portfolio-details__content-image-header">Chrome - Cloud Worker Live</div>
								<img onload="imageLoaded(event)" src="pages/work/img/GATHER_Cloud_${size}.gif">
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