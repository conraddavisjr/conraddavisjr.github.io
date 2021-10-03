const startYear = 2010;
const thisYear = new Date().getFullYear();
const yearsInCareer = thisYear - startYear;

function skillsSubpage() {
  return `
		<div class="about-sub-page-skills" style="opacity: 0">
			<div class="about-effects-border"></div>
			<div class="about-effects-fill"></div>
			<div class="skills-content">
				<div class="skills-description">
					I am a Full-stack Web engineer with a specialty in data-driven applications
					and visual effects. Over my ${yearsInCareer} year career, I've had the fortune to
					develop a wide range of skills in the arts, engineering, and leadership.
					Below is a short list of some of my favorites...
				</div>

				<div class="skills-list">
					<div class="item">
						<div class="item-title">Programming</div>
						<div class="sub-items">
							<span>Javascript</span>
							<span>Typescript</span>
							<span>Node.js</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Animation</div>
						<div class="sub-items">
							<span>SVG</span>
							<span>CSS</span>
							<span>Canvas</span>
							<span>WebGL</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Frameworks</div>
						<div class="sub-items">
							<span>React</span>
							<span>Angular</span>
							<span>React Native</span>
							<span>Phaser</span>
							<span>Express.js</span>
							<span>Next.js</span>
							<span>Redux toolkit</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Data</div>
						<div class="sub-items">
							<span>Google Cloud Plafform</span>
							<span>MySQL</span>
							<span>SQLite</span>
							<span>Google Firestore</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Functional testing</div>
						<div class="sub-items">
							<span>Jest</span>
							<span>RTL</span>
							<span>Enzyme</span>
							<span>Cypress</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Libraries / APIs</div>
						<div class="sub-items">
							<span>Stripe API</span>
							<span>D3</span>
							<span>Three.js</span>
							<span>Google Firestore API</span>
							<span>Google Maps API</span>
							<span>GreenSock</span>
							<span>Scroll Magic</span>
						</div>
					</div>

					<div class="item">
						<div class="item-title">Studio</div>
						<div class="sub-items">
							<span>Figma</span>
							<span>Photoshop</span>
							<span>Illustrator</span>
							<span>After Effects</span>
							<span>ProTools</span>
							<span>Final Cut Pro</span>
						</div>
					</div>

				</div>
			</div>
		</div>
	`;
}
