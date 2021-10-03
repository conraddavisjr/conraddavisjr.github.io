let aboutPageHasLoaded = false;
let aboutContainerName = 'about-container';
let aboutContainer;

function aboutPage(uiPanel, apiCollection, loadObject, scene, camera) {
  // if the page hasn't loaded yet, populate it in the DOM
  if(!aboutPageHasLoaded) {
    // ui template styles
  	let aboutContainerStyles = `
      width: 100%;
      height: 100%;
      overflow: scroll;
      opacity: 0;
      transition: 0.5s;
    `;

    let aboutInnerStyles = `
      background-color: white;
      margin-top: 80vh;
    `;

    let imageStyles = `
      background-color: gray;
      display: block;
      width: 200px;
      height: 200px;
      float: right;
      margin: 0 0 2rem 2rem;
    `

    let contentStyles = `
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem 2rem 5rem;
    `

    loadObject('models/about_section.obm', scene);

    // generate ui template
    let interfaceUI = `
      <div class='${aboutContainerName} content-container' style='${aboutContainerStyles}'>
        <div class='inner' style='${aboutInnerStyles}'>
          <div class='content' style='${contentStyles}'>
            <h2>About me</h2>
            <p>
              <img src="" alt="" style='${imageStyles}'>
              <p>Since I was six years old, I've been around computers and gadgets. I was the child who meddled with devices and toys;
              piecing them apart and seeing what they were made of. I wanted to know what made things work, why it was attractive to me, and how I could improve it.</p>

              <p>I was naturally drawn to fine arts, performance, and presentation. As a child I drew, sang, played piano,
              designed presentations on my PC and made video games for my younger brother and I. I enjoyed impressing people with beautiful art.
              I love presentation, and websites are among the epitome of presentations. When I build websites, I don't think about the site, I think about the people I'm building it for.</p>

              <p>Websites are, as I like to think of them, human interaction and I apply the interactions from my life to my work.
              Let's take design into consideration. When you see something you are attracted to for the first time, you're not
              immediately evaluating its traits, initially, you are simply indulged in the attraction; it's intuitive and it's natural; that is beauty.
              I strive to incorporate these qualities and invoke these emotions into my design. Development is the "electricity" of our industry,
              its everywhere and involved in practically everything we do.</p>

              <p>It runs 24/7 behind the curtains and works until the moment it doesn't; our lights turn out,
              and everything comes to a hault while we suddenly realize how many things it was powering. Solid development works without you noticing.
              It's rapid, problem-free, and graceful; those are the qualities I focus on when I develop. Great design draws us in, it makes things useable;
              great development keeps us there, it makes things useful. The marriage of the two creates effective technology and I absolutely love when they come together.
              I love learning new things, this passion led me to develop quite a few hobbies and interests like dancing, playing piano, exercise, singing (shower quality),
              and trying something new quite often.</p>
            </p>
          </div>
        </div>
      </div>
    `;

  	uiPanel.insertAdjacentHTML('afterbegin', interfaceUI);
    let lastScrollTop = 0;
    if (!aboutContainer) {
      aboutContainer = document.querySelector(`.${aboutContainerName}`);

      // watch scroll events on the about container
      aboutContainer.addEventListener('scroll', (e) => {
        let st = e.target.scrollTop;
        let scrollVal = 0.001;

        if (st > lastScrollTop && st > 0) {
          // scrolling down
          camera.rotation.y += scrollVal;
          camera.position.z += scrollVal;
        } else {
          // scrolling up
          if (camera.rotation.y >= -2.64 || camera.position.z >= -2.03) {
            camera.rotation.y -= scrollVal * 1.4;
            camera.position.z -= scrollVal * 1.4;
          }
        }
        lastScrollTop = st;
      });
    }
  }

  aboutPageHasLoaded = true;

  // fade in the UI
  setTimeout(fadeIn, 50);

  function fadeIn() {
    aboutContainer.style.opacity = 1;
    aboutContainer.style.visibility = 'visible';
  }
}