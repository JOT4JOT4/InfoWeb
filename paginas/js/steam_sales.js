document.addEventListener("DOMContentLoaded", async () => {
  const section = document.getElementById("section-offert");
  section.innerHTML = "<p class='text-white'>Cargando ofertas...</p>";

  try {
    // CheapShark API: Top 8 ofertas de Steam
    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50&sortBy=dealRating");
    const deals = await response.json();

    section.innerHTML = "";
    deals.forEach(deal => {
      section.innerHTML += `
        <a class="offer-card flex flex-col hover:scale-105 transition-transform relative" href="${deal.dealID ? `https://www.cheapshark.com/redirect?dealID=${deal.dealID}` : '#'}" target="_blank" title="${deal.title}">
          <div class="relative">
            <img src="${deal.thumb}" alt="${deal.title}" class="h-32 w-64 self-center object-cover rounded-lg"/>
            <span class="absolute bottom-2 right-2 bg-yellow-300 border-2 border-yellow-600 rounded-lg px-2 py-1 text-red-600 font-bold text-lg shadow-lg">
              ${Math.round(100 - (deal.salePrice / deal.normalPrice) * 100)}%
            </span>
          </div>
          <div class="flex justify-center">
            <h3 class="text-white font-bold text-center">${deal.title}</h3>
          </div>
          <div class="flex justify-center gap-2 mt-1">
            <span class="text-green-400 font-bold">\$${deal.salePrice}</span>
            <span class="text-gray-400 line-through">\$${deal.normalPrice}</span>
          </div>
        </a>
      `;
    });
  } catch (error) {
    section.innerHTML = "<p class='text-red-500'>Error al cargar ofertas.</p>";
  }
});