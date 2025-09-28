document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('item-list');
    container.innerHTML = '<span class="text-white">Cargando la lista de bayas...</span>';

    try {
        const listRes = await fetch('https://pokeapi.co/api/v2/berry/');
        const listData = await listRes.json();
        

        const detailPromises = listData.results.map(async (berry) => {
            const detailRes = await fetch(berry.url);
            const detailData = await detailRes.json();
            

            const itemUrl = detailData.item.url;
            const itemRes = await fetch(itemUrl);
            const itemData = await itemRes.json();
            
            return {
                name: berry.name,
                image: itemData.sprites.default, 
                description: itemData.effect_entries[0].effect,
                firmness: detailData.firmness.name
            };
        });
        
        const berries = await Promise.all(detailPromises);
        container.innerHTML = ''; 

        berries.forEach(berry => {
            const el = document.createElement('div');
            el.className = 'bg-white/80 rounded-lg shadow-lg p-4 w-80 flex flex-col gap-2';
            
            const formattedName = berry.name.charAt(0).toUpperCase() + berry.name.slice(1);
            
            el.innerHTML = `
                <h3 class="text-xl font-bold text-gray-900">${formattedName}</h3>
                
                <img src="${berry.image}" alt="Imagen de ${formattedName}" class="w-16 h-16 object-contain self-center mb-2" />
                
                <p class="text-gray-700">
                    <span class="font-semibold">Firmeza:</span> ${berry.firmness || 'Desconocida'}
                </p>
                
                <p class="text-gray-700">
                    <span class="font-semibold">Efecto:</span> ${berry.description || 'Sin efecto.'}
                </p>
            `;
            container.appendChild(el);
        });

    } catch (e) {
        console.error(e);
        container.innerHTML = '<span class="text-red-400">Error al cargar los datos de las bayas de Pokémon.</span>';
    }
});