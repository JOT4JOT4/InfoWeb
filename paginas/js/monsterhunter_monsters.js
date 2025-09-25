document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('monster-list');
  container.innerHTML = '<span class="text-white">Cargando...</span>';
  try {
    const res = await fetch('https://mhw-db.com/monsters');
    const monsters = await res.json();
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
  } catch (e) {
    container.innerHTML = '<span class="text-red-400">Error al cargar los datos de monstruos.</span>';
  }
});