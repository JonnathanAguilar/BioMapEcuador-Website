document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.getElementById('mapa');
    const inicioBtn = document.getElementById('inicio');
    const inicioBtnaside=document.getElementById('inicioBtn');

    inicioBtnaside.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    inicioBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

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
            mostrarVentanaEmergente(provincia);
        }
    });

    function mostrarVentanaEmergente(provincia) {
        const info = obtenerInfoProvincia(provincia);

        // Obtener elementos del modal
        const modal = document.getElementById('myModal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const modalImage = document.getElementById('modal-image');

        // Actualizar contenido del modal
        modalTitle.textContent = provincia;
        modalBody.children[0].textContent = info; // Primer párrafo del modal-body
        modalImage.src = 'images/condor.png'; // Imagen del modal

        // Mostrar el modal
        modal.style.display = 'block';

        // Agregar evento para cerrar el modal al hacer clic en la X
        const closeModal = modal.querySelector('.close');
        closeModal.onclick = function () {
            modal.style.display = 'none';
        };

        // Agregar evento para reproducir sonido
        const playSoundButton = document.getElementById('playSoundButton');
        playSoundButton.onclick = function () {
            const audio = new Audio('/sounds/sonidoCondor.mp3');
            audio.play();
            
        };

        // Agregar evento para cerrar el modal al hacer clic en el icono de salida de emergencia
        const exitIcon = document.getElementById('exitIcon');
        exitIcon.onclick = function () {
            modal.style.display = 'none';
        };
    }

    function obtenerInfoProvincia(provincia) {
        // Información específica para cada provincia
        const infoProvincias = {
            'Azuay': 'Información detallada sobre la provincia del Azuay.',
            'Bolívar': 'Información sobre Bolívar.',
            'Carchi': 'Información sobre Carchi.',
            // Añadir más provincias aquí
        };
        return infoProvincias[provincia] || 'Información no disponible para esta provincia.';
    }
});
