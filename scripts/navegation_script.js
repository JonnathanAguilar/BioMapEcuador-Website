document.addEventListener("DOMContentLoaded", function() {
    const mapa = document.getElementById("mapa");
    const zoomInButton = document.getElementById("zoom-in");
    const zoomOutButton = document.getElementById("zoom-out");
    const searchBox = document.getElementById("search-box");

    let currentScale = 1; // Variable para mantener el estado actual de escala

    zoomInButton.addEventListener("click", function() {
        currentScale += 0.2; // Aumentar la escala actual
        mapa.style.transform = `scale(${currentScale})`;
    });

    zoomOutButton.addEventListener("click", function() {
        if (currentScale > 1) {
            currentScale -= 0.2; // Disminuir la escala actual si es mayor que 1
            mapa.style.transform = `scale(${currentScale})`;
        }
    });

    searchBox.addEventListener("input", function() {
        const searchTerm = searchBox.value.trim().toLowerCase(); // Obtener el término de búsqueda

        // Obtener todas las regiones del mapa
        const paths = mapa.querySelectorAll("path");

        paths.forEach(path => {
            const title = path.getAttribute("title").toLowerCase(); // Obtener el título de la región

            if (title.includes(searchTerm)) {
                path.style.fill = "#FFEB3B"; // Resaltar en amarillo si coincide con el término de búsqueda
            } else {
                path.style.fill = "#66BB6A"; // Restaurar el color original si no coincide
            }
        });
    });

    // Establecer colores iniciales para las regiones del mapa y añadir eventos de mouse
    const paths = mapa.querySelectorAll("path");

    paths.forEach(path => {
        path.style.fill = "#66BB6A"; // Color verde inicial
        path.addEventListener("mouseover", function() {
            if (path.style.fill !== "#FFEB3B") { // Cambiar solo si no está resaltado por búsqueda
                path.style.fill = "#FFEB3B"; // Resaltar en amarillo al pasar el mouse
            }
        });
        path.addEventListener("mouseout", function() {
            if (path.style.fill !== "#FFEB3B") { // Restaurar solo si no está resaltado por búsqueda
                path.style.fill = "#66BB6A"; // Volver al color verde al quitar el mouse
            }
        });
    });
});
