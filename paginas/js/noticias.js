document.addEventListener("DOMContentLoaded", async () => {
  const section = document.getElementById("section-id");
  section.innerHTML = "<p class='text-white'>Cargando posts...</p>";

  try {
    const response = await fetch("https://my-json-server.typicode.com/JOT4JOT4/InfoWebmovilFake");
    const data = await response.json();

    // Ahora usamos data.posts
    section.innerHTML = "";
    data.posts.forEach(post => {
      section.innerHTML += `
        <article class="flex flex-col md:flex-row bg-white/10 rounded-lg p-4 gap-4 hover:scale-105 transition-transform">
          <img src="${post.photo}" alt="${post.title}" class="h-[200px] w-[400px] object-cover rounded-lg"/>
          <div class="flex flex-col justify-between">
            <h3 class="text-white font-bold text-xl mb-2">${post.title}</h3>
            <p class="text-white mb-2">${post.summary}</p>
          </div>
        </article>
      `;
    });
  } catch (error) {
    section.innerHTML = "<p class='text-red-500'>Error al cargar posts.</p>";
  }
});