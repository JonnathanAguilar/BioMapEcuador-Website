document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.getElementById('mapa');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');

    mapa.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'path') {
            e.target.style.fill = '#FFD700'; // Resaltar provincia
        }
    });
    mapa.addEventListener('click', (e) => {
        if (e.target.tagName === 'path') {
            const provincia = e.target.getAttribute('title');
            mostrarVentanaEmergente(provincia);
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
            mostrarPopup(provincia, e.pageX, e.pageY);
        }
    });

    document.addEventListener('click', (e) => {
        if (!mapa.contains(e.target) && !popup.contains(e.target)) {
            popup.style.display = 'none';
        }
    });

    function mostrarVentanaEmergente(provincia) {
        const info = obtenerInfoProvincia(provincia);
        const ventanaEmergente = window.open('', '_blank', 'width=400,height=400');
        ventanaEmergente.document.write(`
            <html>
            <head>
                <title>Ventana Emergente - ${provincia}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        padding: 20px;
                    }
                    h2 {
                        color: #27633B;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <h2>${provincia}</h2>
                <p>${info}</p>
                <img src="images/condor.png" alt="Imagen de Cóndor">
            </body>
            </html>
        `);
        ventanaEmergente.document.close();
    }

    function obtenerInfoProvincia(provincia) {
        // Información específica para cada provincia
        const infoProvincias = {
            'Azuay': 'Información detallada sobre la provincia del Azuay.',
            'Bolívar': 'Información sobre Bolívar.',
            'Carchi': 'Información sobre Carchi.',
            // Añadir más provincias aquí
        };
        return infoProvincias[provincia] || 'Información no disponible';
    }
    }
);


