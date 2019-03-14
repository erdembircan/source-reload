const reloadClient = new SourceReloadClient('/reloadStream');

const srT = document.querySelector('#srT');

fetch('/api/lastrestart').then(res => res.json()).then((data) => {
  srT.textContent = data.time;
});
