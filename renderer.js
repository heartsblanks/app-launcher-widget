const { ipcRenderer } = require('electron');

function toggleWidget() {
  const widget = document.getElementById('widget');
  const appsList = document.getElementById('apps-list');
  if (widget.classList.contains('widget-collapsed')) {
    widget.classList.remove('widget-collapsed');
    appsList.style.display = 'block';
  } else {
    widget.classList.add('widget-collapsed');
    appsList.style.display = 'none';
  }
}

function openApps(category) {
  ipcRenderer.send('open-apps', category);
}
