let monstersData = [];

function renderMonsters(monsters) {
  const container = document.getElementById('monster-list');
  if (monsters.length === 0) {
    container.innerHTML = '<span class="text-white">No se encontraron monstruos.</span>';
    return;
  }
  container.innerHTML = '';
  monsters.forEach(monster => {
    const el = document.createElement('div');
    el.className = 'bg-white/80 rounded-lg shadow-lg p-4 w-80 flex flex-col gap-2';
    el.innerHTML = `
      <h3 class="text-xl font-bold text-gray-900">${monster.name}</h3>
      <p class="text-gray-700"><span class="font-semibold">Tipo:</span> ${monster.type || 'Desconocido'}</p>
      <p class="text-gray-700"><span class="font-semibold">Descripción:</span> ${monster.description || 'Sin descripción.'}</p>
      <p class="text-gray-700"><span class="font-semibold">Elementos:</span> ${(monster.elements && monster.elements.length > 0) ? monster.elements.join(', ') : 'Ninguno'}</p>
      <p class="text-gray-700"><span class="font-semibold">Debilidades:</span> ${
        (monster.weaknesses && monster.weaknesses.length > 0)
          ? monster.weaknesses.map(w => w.element).join(', ')
          : 'Ninguna'
      }</p>
    `;
    container.appendChild(el);
  });
}

function getUnique(arr) {
  return [...new Set(arr.filter(e => e && e.length > 0))];
}

async function fetchMonsters() {
  const container = document.getElementById('monster-list');
  container.innerHTML = '<span class="text-white">Cargando...</span>';
  try {
    const res = await fetch('https://mhw-db.com/monsters');
    monstersData = await res.json();

    // Poblar filtros
    const typeSelect = document.getElementById('filter-type');
    const elementSelect = document.getElementById('filter-element');
    const types = getUnique(monstersData.map(m => m.type));
    const elements = getUnique(monstersData.flatMap(m => m.elements));

    types.forEach(type => {
      const opt = document.createElement('option');
      opt.value = type;
      opt.textContent = type;
      typeSelect.appendChild(opt);
    });

    elements.forEach(element => {
      const opt = document.createElement('option');
      opt.value = element;
      opt.textContent = element;
      elementSelect.appendChild(opt);
    });

    renderMonsters(monstersData);
  } catch (e) {
    container.innerHTML = '<span class="text-red-400">Error al cargar los datos de monstruos.</span>';
  }
}

function applyFilters() {
  const name = document.getElementById('search-name').value.toLowerCase();
  const type = document.getElementById('filter-type').value;
  const element = document.getElementById('filter-element').value;

  let filtered = monstersData.filter(monster => {
    const matchName = monster.name.toLowerCase().includes(name);
    const matchType = !type || monster.type === type;
    const matchElement = !element || (monster.elements && monster.elements.includes(element));
    return matchName && matchType && matchElement;
  });

  renderMonsters(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchMonsters();

  document.getElementById('search-name').addEventListener('input', applyFilters);
  document.getElementById('filter-type').addEventListener('change', applyFilters);
  document.getElementById('filter-element').addEventListener('change', applyFilters);
});