document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.getElementById('mapa');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    mapa.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'path') {
            e.target.style.fill = '#FFD700'; // Resaltar provincia
        }
    });

    mapa.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'path') {
            e.target.style.fill = ''; // Quitar resaltado
        }
    });

    mapa.addEventListener('click', (e) => {
        if (e.target.tagName === 'path') {
            const provincia = e.target.getAttribute('title');
            const info = obtenerInfoProvincia(provincia); // Función para obtener información de la provincia
            popupContent.innerHTML = info;
            popup.style.display = 'block';
            popup.style.left = `${e.pageX}px`;
            popup.style.top = `${e.pageY}px`;
        }
    });

    document.addEventListener('click', (e) => {
        if (!mapa.contains(e.target) && !popup.contains(e.target)) {
            popup.style.display = 'none';
        }
    });

    function obtenerInfoProvincia(provincia) {
        // Aquí puedes agregar la información de cada provincia
        const infoProvincias = {
            'Azuay': '<h2>Hola Cuenca</h2><img src="/images/condor.png" alt="Imagen de Cuenca">',
            'Bolívar': '<h2>Información sobre Bolívar</h2>',
            'Carchi': '<h2>Información sobre Carchi</h2>',
            // Añade más provincias aquí
        };
        return infoProvincias[provincia] || '<h2>Información no disponible</h2>';
    }
});
