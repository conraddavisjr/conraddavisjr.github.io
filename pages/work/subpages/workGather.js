function workGatherSubpage() {
  function getView() {
    return `
      <div class="work-sub-page-workGather" style="opacity: 0">
        <div class="work-sub-page-content">
          <h1>Google Gather</h1>
          <h2>Global campaigns</h2>
          <div class="port-cta gather"> See details </div>
        </div>
      </div>
    `;
  }
  function getCtaName() {
    return 'port-cta.gather';
  }

  return {
    getView,
    getCtaName
  }
}