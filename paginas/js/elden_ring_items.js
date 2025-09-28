document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('item-list');
  container.innerHTML = '<span class="text-white">Cargando...</span>';
    try {
    const res = await fetch('https://eldenring.fanapis.com/api/items');
    const items = await res.json();
    container.innerHTML = '';
    items.data.forEach(item => {
      const el = document.createElement('div');
      el.className = 'bg-white/80 rounded-lg shadow-lg p-4 w-80 flex flex-col gap-2';
        el.innerHTML = `
        <h3 class="text-xl font-bold text-gray-900">${item.name}</h3>
        <img src="${item.image}" alt="Imagen de ${item.name}" class="w-16 h-16 object-contain self-center mb-2" />
        <p class="text-gray-700"><span class="font-semibold">Tipo:</span> ${item.description || 'Desconocido'}</p>
        <p class="text-gray-700"><span class="font-semibold">Descripción:</span> ${item.effect || 'Sin efecto.'}</p>
        `;
        container.appendChild(el);
    });
    } catch (e) {
    container.innerHTML = '<span class="text-red-400">Error al cargar los datos de items.</span>';
    }
});
