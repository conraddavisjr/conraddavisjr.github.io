function workPlaySubpage() {
  function getView() {
    return `
      <div class="work-sub-page-workPlay" style="opacity: 0">
        <div class="work-sub-page-content">
          <h1>Google Play</h1>
          <h2>Change the Game campaign</h2>
          <div class="port-cta play"> See details </div>
        </div>
      </div>
    `;
  }
  function getCtaName() {
    return 'port-cta.play';
  }

  return {
    getView,
    getCtaName
  }
}