async function loadHotkeys(app) {
  const res = await fetch(`data/${app}.json`);
  const data = await res.json();
  render(data);
}
function render(data) {
  const q = document.getElementById('search').value.trim().toLowerCase();
  const container = document.getElementById('hotkeys');
  container.innerHTML = '';
  data.categories.forEach(cat => {
    const items = cat.items.filter(it => {
      const text = `${it.action} ${(it.shortcut_standard||'')} ${(it.shortcut_trackpad||'')}`.toLowerCase();
      return !q || text.includes(q);
    });
    if (!items.length) return;
    const section = document.createElement('section');
    section.innerHTML = `<h2>${cat.name}</h2>`;
    items.forEach(it => {
      section.innerHTML += `<div class="row">
        <div class="action">${it.action}</div>
        <div class="keys">
          <span class="std"><b>Standard:</b> ${it.shortcut_standard||'-'}</span>
          ${it.shortcut_trackpad?`<span class="tp"><b>Trackpad:</b> ${it.shortcut_trackpad}</span>`:''}
        </div></div>`;
    });
    container.appendChild(section);
  });
}
document.getElementById('app-picker').addEventListener('change', (e)=>loadHotkeys(e.target.value));
document.getElementById('search').addEventListener('input', ()=>loadHotkeys(document.getElementById('app-picker').value));
loadHotkeys('blender');