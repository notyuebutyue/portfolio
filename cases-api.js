/* Loads case studies written in the admin and puts them in front of the ones in cases.js. */
window.casesReady = fetch('/api/posts?kind=case')
  .then(function (r) { return r.ok ? r.json() : []; })
  .then(function (list) { if (Array.isArray(list) && list.length) window.CASES = list.concat(window.CASES || []); })
  .catch(function () {});
