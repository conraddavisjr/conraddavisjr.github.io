// let workPageHasLoaded = false;
// let workContainerName = 'work-container';
// let workPath = 'pages/work';
// let portfolioPath = `${workPath}/portfolio`;
// let workContainer;
// let workThumbnails;
// let closeWorkBtn;
// let openedProfile = {};
// let portfolioIsOpen = false;
// let workTl = new TimelineLite();
// let loadedPortfolios = {};

// // store all thumbnail position values
// thumbVals = {
//   'work-thumbnail-samsung': {
//     set: {
//       clip: 'rect(0vh, 59.5vw, 35.5vh, 1vw)',
//       zIndex: 2,
//       width: '100vw',
//       height: '100vh'
//     },
//     close: {
//       closing: {
//         clip: 'rect(0vh, 59.5vw, 35.5vh, 1vw)'
//       },
//       reset: {
//         clip: 'rect(0vh, 59.5vw, 35.5vh, 1vw)',
//         width: '59.5vw',
//         height: '35.5vh',
//       }
//     },
//     open: {
//       clip: 'rect(35vh, 80vw, 65vh, 20vw)',
//       left: 0
//     },
//   },
//   'work-thumbnail-wig': {
//     set: {
//       clip: 'rect(0vh, 100vw, 71vh, 61vw)',
//       zIndex: 2,
//       width: '100vw',
//       height: '100vh'
//     },
//     close: {
//       closing: {
//         clip: 'rect(0vh, 100vw, 71vh, 62vw)',
//         right: '1vw'
//       },
//       reset: {
//         clip: 'rect(0vh, 40vw, 71vh, 0vw)',
//         width: '38vw',
//         height: '71vh',
//       }
//     },
//     'open': {
//       clip: 'rect(0vh, 75.5vw, 71vh, 37vw)',
//       right: 0
//     },
//   },
//   'work-thumbnail-audi': {
//     set: {
//       clip: 'rect(36vh, 59.5vw, 71vh, 1vw)',
//       zIndex: 2,
//       width: '100vw',
//       height: '100vh',
//       top: 0
//     },
//     close: {
//       closing: {
//         clip: 'rect(36vh, 58.5vw, 71vh, 0vw)',
//         left: '1vw'
//       },
//       reset: {
//         clip: 'rect(0vh, 58.5vw, 35vh, 0vw)',
//         top: '36vh',
//         width: '58.5vw',
//         height: '35vh'
//       }
//     },
//     open: {
//       clip: 'rect(30vh, 79.5vw, 65.5vh, 21vw)',
//       left: 0
//     },
//   },
//   'work-thumbnail-gather': {
//     set: {
//       clip: 'rect(71.8vh, 98vw, 100vh, 0vw)',
//       zIndex: 2,
//       width: '100vw',
//       height: '100vh',
//       top: 0
//     },
//     close: {
//       closing: {
//         clip: 'rect(71.8vh, 98vw, 100vh, 0vw)',
//         left: '1vw'
//       },
//       reset: {
//         clip: 'rect(0.7vh, 100vw, 35vh, 0vw)',
//         top: '71vh',
//         width: '98vw',
//         height: '35vh',
//         left: '1vw',
//         height: '30vh'
//       }
//     },
//     open: {
//       clip: 'rect(22vh, 99vw, 60vh, 1vw)',
//       left: 0
//     }
//   }
// }

// function workPage(uiPanel, apiCollection, loadObject, scene, camera) {
//   // if the page hasn't loaded yet, populate it in the DOM
//   if(!workPageHasLoaded) {

//     // load ui template styles
//     apiCollection.loadStyles(`${workPath}/styles.css`).then(buildUI());

//     // load all of the portfolio previews
//     // apiCollection.loadScript(`${portfolioPath}/samsung-preview.js`)
//     // .then(() => apiCollection.loadScript(`${portfolioPath}/wig-preview.js`)
//     //   .then(() => apiCollection.loadScript(`${portfolioPath}/audi-preview.js`)
//     //     .then(() => apiCollection.loadScript(`${portfolioPath}/gather-preview.js`)
//     //       .then(buildUI)
//     //     )
//     //   )
//     // )

//     // reset window dimensions on resize
//     window.addEventListener('resize', updateThumbBg);

//     // define work UI scaffold
//     let uiScaffold = document.querySelector('.ui-scaffold');

//     function updateThumbBg() {
//       if (workThumbnails) {
//         let largerWinDim = window.largerWinDim;
//         let bgDim = largerWinDim == 'winW' ? '100vw 100vw' : '100vh 100vh';
//         workThumbnails.forEach((thumbnail) => {
//           thumbnail.style.backgroundSize = bgDim;
//         });
//       }
//     }

//     // listen for keyboard button press
//     document.onkeydown = handleKeyDown;

//     // listen for clicks on the workThumbnails
//     window.workThumbnailClick = function workThumbnailClick(e) {
//       let thumbnail = e.target;
//       openPortfolio(thumbnail);
//     }

//     window.imageLoaded = function imageLoaded(e) {
//       let target = e.target;
//       let targetParent = target.parentNode;
//       targetParent.style.backgroundImage = `url(${e.target.src})`;
//       targetParent.classList.remove('img-loading');
//     }

//     function openPortfolio(thumbnail) {
//       // ignore if the portfolio is already opened
//       if (portfolioIsOpen) return;
//       portfolioIsOpen = true;

//       let tl = new TimelineLite();
//       let projName = thumbnail.getAttribute('projName');
//       // get the thumbnail's class name
//       let thumbnailClass = thumbnail.classList[1];
//       // get the 'open' and 'set' styles data
//       let styles_O = thumbVals[thumbnailClass]['open'];
//       let styles_S = thumbVals[thumbnailClass]['set'];
//       // thumbnail some thumbnail elements
//       let img = thumbnail.querySelector('.work-preview-img');
//       let copy = thumbnail.querySelector('.copy-container');
//       // make the close button visible
//       closeWorkBtn.classList.add('is-visible');

//       // update the openedProfile state with
//       // the thumbnail and its class
//       openedProfile['thumbnail'] = thumbnail;
//       openedProfile['copy'] = copy;
//       openedProfile['classList'] = thumbnailClass;

//       // hide thumbnail copy
//       tl.set(copy, {opacity: 0})
//       // set preliminary styles on the thumbnail
//       tl.set(thumbnail, styles_S)
//       // move the clipping to the center of the dom
//       tl.to(thumbnail, 0.5, styles_O)
//       // reveal the full image
//       tl.to(thumbnail, 0.5, {
//         clip: 'rect(0vh, 100vw, 100vh, 0vw)',
//         ease: Power3.easeOut,
//       })
//       // make the children elements selectable
//       tl.call(() => thumbnail.classList.add('children-selectable'))

//       // load the detail view of the portfolio item
//       // first check if the detail view has been loaded
//       // if it has, only render it
//       let detailsHasLoaded = false;
//       let scaffoldDrawn = false;

//       if (Object.keys(loadedPortfolios).includes(projName)) {
//         // reveal the portfolio details
//         console.log('loadedPortfolios[projName]: ', loadedPortfolios[projName]);
//         tl.to(loadedPortfolios[projName], .5, {display: 'block', opacity: 1})
//       }
//       else {
//         // display the uiScaffold
//         tl.call(() => uiScaffold.style.display = 'block');

//         // set a two second timer for the uiScaffold loader
//         // flip a flag when the timer is complete
//         setTimeout(() => {
//           scaffoldDrawn = true
//           // if the details page has loaded, reveal it
//           if (detailsHasLoaded) {
//             initDetailsPageRender(uiScaffold, projName);
//           }
//         }, 2900);

//         // load the details
//         apiCollection.loadScript(`${portfolioPath}/${projName}-details.js`)
//         .then(() => {
//           // inject the detail view into the thumbnail
//           thumbnail.insertAdjacentHTML('afterbegin', window[`${projName}Details`]());
//           // declare that the details view has loaded
//           detailsHasLoaded = true;

//           // load the details page controller
//           apiCollection.loadScript(`${portfolioPath}/details-controller.js`)

//           // register the loaded the portfolio
//           loadedPortfolios[projName] = uiPanel.querySelector(`.${projName}-details`);

//           // reveal the portfolio details
//           // if the scaffold completed drawing
//           if (scaffoldDrawn) {
//             initDetailsPageRender(uiScaffold, projName);
//           }
//         })
//       }


//       // flip a flag when the detail page has loaded

//       // // blur and desaturate the thumb image
//       // tl.call(() => {
//       //   if(portfolioIsOpen) {
//       //     thumbnail.classList.add('press-blur'), '-=.5'
//       //   }
//       // })
//     }

//     function initDetailsPageRender(uiScaffold, projName) {
//       let tl = new TimelineLite();
//       tl.set(uiScaffold, {display: 'none'})
//       tl.to(loadedPortfolios[projName], 1, {display: 'block', opacity: 1}, "+=.1")
//     }

//     function handleKeyDown(e) {
//       if(e.key == "Escape" && portfolioIsOpen) closePortfolio();
//     }

//     /**
//      * close a portfolio
//      */
//     function closePortfolio() {
//       portfolioIsOpen = false;
//       let tl = new TimelineLite();
//       let {thumbnail, classList, img, copy} = openedProfile;
//       let styles = thumbVals[`${classList}`]['close'];
//       let projName = thumbnail.getAttribute('projName');

//       // remove the close button
//       closeWorkBtn.classList.remove('is-visible');

//       styles['closing']['ease'] = Power3.easeOut;
//       styles['reset']['zIndex'] = 1;

//       // hide the uiScaffold and the portfolio details
//       // and make the children elements non-selectable
//       tl.call(() => {
//         uiScaffold.style.display = 'none';
//         loadedPortfolios[projName].style.display = 'none';
//         loadedPortfolios[projName].style.opacity = 0;
//         thumbnail.classList.remove('children-selectable')
//       })
//       // run thumbnail closing animation
//       tl.to(thumbnail, .5, styles['closing'])
//       // reset the thumb to its original position
//       tl.set(thumbnail, styles['reset'])
//       tl.to(copy, .3, {opacity: 1} )
//     }

//     function buildUI() {
//       // loadObject('models/work_section.obm', scene);

//       // generate ui template
//       let interfaceUI = `
//         <div class='work-container content-container'>
//           <div class='work-container-inner'>
//             <div class='close-btn'></div>
//             <div class='content'>
//               <div
//                 onclick="workThumbnailClick(event)"
//                 class="work-thumbnail work-thumbnail-samsung img-loading"
//                 projName="samsung">
//                 <img onload="imageLoaded(event)" src="/pages/work/img/Cool-Beautiful-Wallpaper.jpg">
//                 <div class="copy-container">
//                   <p>Samsung</p>
//                   <h2>Gear S2 Campaign</h2>
//                 </div>
//               </div>
//               <div
//                 onclick='workThumbnailClick(event)'
//                 class='work-thumbnail work-thumbnail-wig img-loading'
//                 projName="wig">
//                 <img onload="imageLoaded(event)" src="/pages/work/img/CTG-thumbnail.png">
//                 <div class="copy-container">
//                   <p>Google</p>
//                   <h2>Women in Gaming</h2>
//                 </div>
//               </div>
//               <div
//                 onclick='workThumbnailClick(event)'
//                 class='work-thumbnail work-thumbnail-audi img-loading'
//                 projName="audi">
//                 <img onload="imageLoaded(event)" src="/pages/work/img/audi.jpg">
//                 <div class="copy-container">
//                   <p>Audi</p>
//                   <h2>AudiUSA.com</h2>
//                 </div>
//               </div>
//               <div
//                 onclick='workThumbnailClick(event)'
//                 class='work-thumbnail work-thumbnail-gather img-loading'
//                 projName="gather">
//                 <img onload="imageLoaded(event)" src="/pages/work/img/Cool-Beautiful-Wallpaper.jpg">
//                 <div class="copy-container">
//                   <p>Google</p>
//                   <h2>Gather: Event Planning</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       `;

//       // add the UI to the DOM
//       uiPanel.insertAdjacentHTML('afterbegin', interfaceUI);
//       mountInterface();
//     }

//     function mountInterface() {
//       workContainer = document.querySelector(`.${workContainerName}`);
//       workThumbnails = document.querySelectorAll('.work-thumbnail');
//       closeWorkBtn = workContainer.querySelector('.close-btn');
//       closeWorkBtn.addEventListener('click', closePortfolio);
//       renderWorkPage();
//       // set the thumb BG dim on init
//       updateThumbBg();
//     }
//     workPageHasLoaded = true;
//   }
//   else {
//     renderWorkPage();
//   }

//   // fade in the UI
//   function renderWorkPage() {
//     workContainer.style.opacity = 1;
//     workContainer.style.visibility = 'visible';
//     workTl.staggerFromTo(workThumbnails, 1, {y: +50, opacity: 0}, {y: 0, opacity: 1}, .2)
//   }
// }