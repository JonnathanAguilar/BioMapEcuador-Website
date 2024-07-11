document.addEventListener('DOMContentLoaded', () => {
    const mapa = document.getElementById('mapa');
    const inicioBtn = document.getElementById('inicio');
    const inicioBtnaside = document.getElementById('inicioBtn');
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalImage = document.getElementById('modal-image');
    const playSoundButton = document.getElementById('playSoundButton');
    const exitIcon = document.getElementById('exitIcon');
    const closeModal = modal.querySelector('.close');

    // Función para cerrar el modal
    function cerrarModal() {
        modal.style.display = 'none';
    }

    // Eventos para cerrar el modal
    closeModal.onclick = cerrarModal;
    exitIcon.onclick = cerrarModal;

    // Eventos para navegar a la página de inicio
    inicioBtnaside.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    inicioBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Eventos para resaltar provincia al pasar el mouse
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

    // Evento para mostrar información al hacer clic en la provincia
    mapa.addEventListener('click', (e) => {
        if (e.target.tagName === 'path') {
            const provincia = e.target.getAttribute('title');
            mostrarVentanaEmergente(provincia);
        }
    });

    function mostrarVentanaEmergente(provincia) {
        const info = obtenerInfoProvincia(provincia);
    
        // Limpiar el contenido anterior del modal
        modalBody.innerHTML = '';
    
        // Actualizar contenido del modal
        modalTitle.textContent = provincia;
        
        // Crear contenedor para información y imagen
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('modal-content-container');
        contentContainer.appendChild(info); // Agregar contenido HTML generado
        
        // Cargar imagen según la provincia
        modalImage.src = obtenerImagenProvincia(provincia);
        
        // Agregar imagen al contenedor
        contentContainer.appendChild(modalImage);
    
        // Agregar contenedor al modal
        modalBody.appendChild(contentContainer);
    
        // Reproducir sonido al hacer clic en el botón de sonido
        playSoundButton.onclick = function () {
            const audioPath = obtenerSonidoProvincia(provincia);
            if (audioPath) {
                const audio = new Audio(audioPath);
                audio.play().catch(error => {
                    console.error('Error al reproducir el audio:', error);
                });
            } else {
                console.log('No se encontró audio para la provincia seleccionada.');
            }
        };
    
        // Mostrar el modal
        modal.style.display = 'block';
    }

    // Función para obtener la información de la provincia desde el JSON
    function obtenerInfoProvincia(provincia) {
        const infoEspecies = {
                "Azuay": {
                    "CondorAndino": {
                        "NombreComun": "Cóndor andino",
                        "NombreCientifico": "Vultur gryphus.",
                        "Habitat": "Zonas montañosas y páramos de la región andina.",
                        "Alimentacion": "Se alimenta principalmente de carroña. También consume pequeños mamíferos, aves y reptiles.",
                        "EsperanzaVida": "Pueden vivir hasta 70 años en cautiverio.",
                        "Amenazas": "La caza furtiva, la destrucción de su hábitat y la contaminación ambiental.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' según la Lista Roja de la UICN, debido a las amenazas continuas que enfrenta en su hábitat natural."
                    }
                },
                "Bolívar": {
                    "OsoDeAnteojos": {
                        "NombreComun": "Oso de Anteojos",
                        "NombreCientifico": "Tremarctos ornatus.",
                        "Habitat": "Bosques nublados y montañosos.",
                        "Alimentacion": "Es omnívoro, alimentándose principalmente de frutas, bromelias, insectos, pequeños mamíferos y ocasionalmente presas más grandes como venados.",
                        "EsperanzaVida": "Pueden vivir hasta 20-25 años en cautiverio.",
                        "Amenazas": "Pérdida de hábitat, caza furtiva y tráfico ilegal de especies.",
                        "EstadoConservacion": "Está clasificado como vulnerable en la lista roja de la UICN."
                    }
                },
                "Carchi": {
                    "Jaguar": {
                        "NombreComun": "Jaguar",
                        "NombreCientifico": "Panthera onca.",
                        "Habitat": "Selvas tropicales, bosques húmedos y secos.",
                        "Alimentacion": "Es carnívoro, se alimenta de mamíferos, aves, reptiles y peces.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 12-15 años.",
                        "Amenazas": "La caza furtiva, la destrucción de su hábitat y la fragmentación de los bosques.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' en la lista roja de la UICN."
                    }
                },
                "Cañar": {
                    "OsoHormiguero": {
                        "NombreComun": "Oso Hormiguero",
                        "NombreCientifico": "Vermilingua.",
                        "Habitat": "Bosques tropicales y subtropicales, incluyendo áreas con vegetación densa y árboles altos.",
                        "Alimentacion": "Principalmente insectívoro, alimentándose de hormigas y termitas, utilizando su largo hocico y lengua pegajosa para extraerlas de sus nidos.",
                        "EsperanzaVida": "Puede vivir hasta 9-15 años en la naturaleza.",
                        "Amenazas": "Pérdida y fragmentación de su hábitat debido a la deforestación y la expansión agrícola.",
                        "EstadoConservacion": "Está clasificado como 'Preocupación Menor' en la Lista Roja de la UICN, debido a su amplia distribución y adaptabilidad a diversos hábitats."
                    }
                },
                "Chimborazo": {
                    "Llama": {
                        "NombreComun": "Llama",
                        "NombreCientifico": "Lama glama.",
                        "Habitat": "Zonas de páramo y montañas de los Andes, especialmente en altitudes elevadas.",
                        "Alimentacion": "Herbívora, se alimenta principalmente de pastos y vegetación baja.",
                        "Amenazas": "Enfermedades como la sarna y la falta de pasto debido a la degradación del hábitat.",
                        "EsperanzaVida": "15-25 años en condiciones controladas.",
                        "EstadoConservacion": "No está listada en la Lista Roja de la UICN debido a su estado domesticado."
                    }
                },
                "Cotopaxi": {
                    "LoboDelParamo": {
                        "NombreComun": "Lobo del páramo.",
                        "NombreCientifico": "Lycalopex culpaeus reissii",
                        "Habitat": "Páramos y zonas montañosas de los Andes, especialmente en altitudes elevadas.",
                        "Alimentacion": "Es omnívoro, alimentándose principalmente de pequeños mamíferos, aves, vegetación y frutas.",
                        "Amenazas": "Pérdida y fragmentación de hábitat debido a la expansión agrícola y ganadera, así como la caza furtiva.",
                        "EsperanzaVida": "Aproximadamente 6-12 años en la naturaleza.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' en la Lista Roja de la UICN debido a la pérdida de hábitat y la caza."
                    }
                },
                "El Oro": {
                    "MonoAullador": {
                        "NombreComun": "Mono Aullador",
                        "NombreCientifico": "Alouatta palliata.",
                        "Habitat": "Bosques tropicales y subtropicales, incluyendo áreas con árboles altos y densa vegetación.",
                        "Alimentacion": "Es principalmente herbívoro, alimentándose de hojas, frutas, flores y brotes.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 20-25 años.",
                        "Amenazas": "Pérdida y fragmentación de su hábitat debido a la deforestación, la caza y el comercio ilegal de mascotas.",
                        "EstadoConservacion": "Está clasificado como 'Preocupación Menor' en la Lista Roja de la UICN, debido a su amplia distribución y a que puede adaptarse a diversos tipos de hábitats."
                    }
                },
                "Esmeraldas": {
                    "DelfinRosado": {
                        "NombreComun": "Delfín Rosado",
                        "NombreCientifico": "Inia geoffrensis.",
                        "Habitat": "Ríos y lagos, prefiriendo aguas tranquilas y de corriente lenta.",
                        "Alimentacion": "Es carnívoro, alimentándose principalmente de peces, aunque también consume crustáceos y ocasionalmente otros animales acuáticos.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 30 años.",
                        "Amenazas": "Pérdida y contaminación de su hábitat debido a la deforestación, minería, pesca ilegal y construcción de represas.",
                        "EstadoConservacion": "Está clasificado como 'Vulnerable' en la Lista Roja de la UICN, debido a la disminución de su población y la continua degradación de su hábitat."
                    }
                },
                "Galápagos": {
                    "TortugaGiganteDeGalapagos": {
                        "NombreComun": "Tortuga Gigante de Galápagos",
                        "NombreCientifico": "Chelonoidis nigra.",
                        "Habitat": "Habita en las Islas Galápagos, prefiriendo áreas de vegetación densa, pastizales y zonas áridas con cactus.",
                        "Alimentacion": "Es herbívora, alimentándose principalmente de hierbas, hojas, frutas y cactus.",
                        "EsperanzaVida": "Pueden vivir más de 100 años, con algunos individuos alcanzando hasta 150 años en la naturaleza.",
                        "Amenazas": "Introducción de especies invasoras, la pérdida de hábitat, la caza furtiva y el cambio climático.",
                        "EstadoConservacion": "Está clasificada como 'Vulnerable' en la Lista Roja de la UICN, con varias subespecies en peligro crítico debido a la reducción de sus poblaciones."
                    }
                },
                "Guayas": {
                    "ManatiDelCaribe": {
                        "NombreComun": "Manatí del Caribe",
                        "NombreCientifico": "Trichechus manatus.",
                        "Habitat": "Aguas costeras poco profundas, ríos y estuarios, prefiriendo áreas con abundante vegetación acuática.",
                        "Alimentacion": "Es herbívoro, alimentándose principalmente de pastos marinos y otras plantas acuáticas.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 40 años, aunque en cautiverio pueden alcanzar edades mayores.",
                        "Amenazas": "Pérdida y degradación de hábitat, colisiones con embarcaciones, contaminación del agua y redes de pesca.",
                        "EstadoConservacion": "Está clasificado como 'Vulnerable' en la Lista Roja de la UICN debido a la disminución de su población y la continua amenaza a su hábitat."
                    }
                },
                "Imbabura": {
                    "AguilaHarpia": {
                        "NombreComun": "Águila Harpía",
                        "NombreCientifico": "Harpia harpyja.",
                        "Habitat": "Bosques tropicales y subtropicales, prefiriendo áreas de selva densa y primaria.",
                        "Alimentacion": "Es carnívora, alimentándose principalmente de mamíferos arborícolas como monos y perezosos, así como de aves y reptiles.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir entre 25 y 35 años.",
                        "Amenazas": "Incluyen la pérdida de hábitat debido a la deforestación, la caza y la captura ilegal.",
                        "EstadoConservacion": "Está clasificada como 'Casi Amenazada' en la Lista Roja de la UICN debido a la disminución de su hábitat y la baja densidad de su población."
                    }
                },
                "Loja": {
                    "TapirDeMontaña": {
                        "NombreComun": "Tapir de Montaña",
                        "NombreCientifico": "Tapirus pinchaque.",
                        "Habitat": "Bosques montanos, páramos y selvas nubladas.",
                        "Alimentacion": "Es herbívoro, alimentándose de hojas, ramas, frutas y cortezas.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 25-30 años.",
                        "Amenazas": "Pérdida de hábitat debido a la agricultura y la ganadería, la caza furtiva y la fragmentación de su población.",
                        "EstadoConservacion": "Está clasificado como 'En Peligro' en la Lista Roja de la UICN debido a su baja población y la continua pérdida de hábitat."
                    }
                },
                "Los Ríos": {
                    "IguanaVerde": {
                        "NombreComun": "Iguana Verde",
                        "NombreCientifico": "Iguana iguana.",
                        "Habitat": "Bosques tropicales, selvas y áreas cercanas a cuerpos de agua.",
                        "Alimentacion": "Es herbívora, alimentándose principalmente de hojas, flores y frutas.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 20 años o más.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación y la captura para el comercio de mascotas.",
                        "EstadoConservacion": "Está clasificada como 'Preocupación Menor' en la Lista Roja de la UICN, pero algunas poblaciones locales pueden estar amenazadas por la caza y la destrucción del hábitat."
                    }
                },
                "Manabí": {
                    "BallenaJorobada": {
                        "NombreComun": "Ballena Jorobada",
                        "NombreCientifico": "Megaptera novaeangliae.",
                        "Habitat": "Océanos y mares, migrando entre áreas de alimentación en aguas frías y áreas de reproducción en aguas tropicales y subtropicales.",
                        "Alimentacion": "Es carnívora, alimentándose principalmente de kril, peces pequeños y plancton, que filtra a través de sus barbas.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 45-50 años.",
                        "Amenazas": "Caza histórica, colisiones con embarcaciones, enredo en artes de pesca y la degradación del hábitat.",
                        "EstadoConservacion": "Está clasificada como 'Preocupación Menor' en la Lista Roja de la UICN, aunque algunas poblaciones están en recuperación después de la prohibición de la caza comercial."
                    }
                },
                "Morona Santiago": {
                    "GuacamayoBandera": {
                        "NombreComun": "Guacamayo Bandera",
                        "NombreCientifico": "Ara macao.",
                        "Habitat": "Bosques tropicales húmedos, selvas y áreas con abundante vegetación densa.",
                        "Alimentacion": "Es frugívoro, alimentándose principalmente de frutas, nueces, semillas y flores.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir entre 40 y 50 años.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación, la captura para el comercio de mascotas y la caza.",
                        "EstadoConservacion": "Está clasificado como 'Preocupación Menor' en la Lista Roja de la UICN, aunque algunas subpoblaciones están en declive debido a las amenazas mencionadas."
                    }
                },
                "Napo": {
                    "Jaguar": {
                        "NombreComun": "Jaguar",
                        "NombreCientifico": "Panthera onca.",
                        "Habitat": "Selvas tropicales, bosques subtropicales, humedales y sabanas, prefiriendo áreas con vegetación densa y acceso a agua.",
                        "Alimentacion": "Es carnívoro, alimentándose principalmente de grandes mamíferos, reptiles y peces.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir entre 12 y 15 años.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación, la caza furtiva y el conflicto con humanos.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' en la Lista Roja de la UICN debido a la disminución de su población y la fragmentación de su hábitat."
                    }
                },
                "Orellana": {
                    "NutriaGiganteDeRio": {
                        "NombreComun": "Nutria Gigante de Río",
                        "NombreCientifico": "Pteronura brasiliensis.",
                        "Habitat": "Ríos, arroyos y lagos de agua dulce en la cuenca del Amazonas y el Pantanal.",
                        "Alimentacion": "Es carnívora, alimentándose principalmente de peces, pero también de crustáceos y pequeños vertebrados.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 10-12 años.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación, la contaminación del agua y la caza furtiva.",
                        "EstadoConservacion": "Está clasificada como 'En Peligro' en la Lista Roja de la UICN debido a la disminución de su población y la continua degradación de su hábitat."
                    }
                },
                "Pastaza": {
                    "PuercosSahinos": {
                        "NombreComun": "Puercos Sahinos",
                        "NombreCientifico": "Tayassuidae.",
                        "Habitat": "Selvas tropicales y bosques densos.",
                        "Alimentacion": "Son omnívoros, alimentándose de frutas, raíces, hojas, insectos y pequeños vertebrados.",
                        "EsperanzaVida": "Puede variar dependiendo de las condiciones del hábitat y las amenazas.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación y la caza furtiva para obtener su carne.",
                        "EstadoConservacion": "Los Tayassuidae en general tienen diferentes estados de stán clasificadas como 'Preocupación Menor', mientras que otras están en peligro debido a la caza y la pérdida de hábitat."
                    }
                },
                "Pichincha": {
                    "OsoAndino": {
                        "NombreComun": "Oso Andino",
                        "NombreCientifico": "Tremarctos ornatus.",
                        "Habitat": "Bosques nublados y páramos de la cordillera de los Andes.",
                        "Alimentacion": "Es omnívoro, alimentándose de una variedad de frutas, bambú, hojas, insectos y pequeños vertebrados.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 20-25 años.",
                        "Amenazas": "Las principales amenazas incluyen la pérdida de hábitat debido a la deforestación, la caza furtiva y el conflicto con humanos.",
                        "EstadoConservacion": "Está clasificado como 'Vulnerable' en la Lista Roja de la UICN debido a la disminución de su población y la fragmentación de su hábitat."
                    }
                },
                "Santa Elena": {
                    "TortugaVerde": {
                        "NombreComun": "Tortuga Verde",
                        "NombreCientifico": "Chelonia mydas.",
                        "Habitat": "Mares tropicales y subtropicales, frecuentando arrecifes de coral, praderas marinas y áreas costeras arenosas para anidar.",
                        "Alimentacion": "Es herbívora, alimentándose principalmente de pastos marinos y algas.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 60-70 años.",
                        "Amenazas": "Captura accidental en artes de pesca, la recolección de huevos, la destrucción de hábitat y la contaminación marina.",
                        "EstadoConservacion": "Está clasificada como 'En Peligro' en la Lista Roja de la UICN debido a la disminución de su población y la continua amenaza a su hábitat."
                    }
                },
                "Santo Domingo de los Tsáchilas": {
                    "GuacamayoAzulYAmarillo": {
                        "NombreComun": "Guacamayo Azul y Amarillo.",
                        "NombreCientifico": "Ara ararauna",
                        "Habitat": "Bosques tropicales y subtropicales, prefiriendo áreas de selva densa y zonas ribereñas.",
                        "Alimentacion": "Es frugívoro, alimentándose principalmente de frutas, nueces, semillas y flores.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir entre 30 y 50 años.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación, la captura para el comercio de mascotas y la caza.",
                        "EstadoConservacion": "Está clasificado como 'Preocupación Menor' en la Lista Roja de la UICN."
                    }
                },
                "Sucumbíos": {
                    "Puma": {
                        "NombreComun": "Puma",
                        "NombreCientifico": "Puma concolor.",
                        "Habitat": "Bosques tropicales, montañas, praderas y desiertos.",
                        "Alimentacion": "Es carnívoro, alimentándose de mamíferos de tamaño mediano a grande, como ciervos, guanacos y roedores.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir entre 8 y 13 años.",
                        "Amenazas": "Pérdida de hábitat, la caza furtiva y el conflicto con humanos.",
                        "EstadoConservacion": "Está clasificado como 'Preocupación Menor' en la Lista Roja de la UICN debido a su amplia distribución, aunque las poblaciones están en declive en algunas áreas debido a las amenazas mencionadas."
                    }
                },
                "Tungurahua": {
                    "TucanAndino": {
                        "NombreComun": "Tucán Andino",
                        "NombreCientifico": "Andigena laminirostris.",
                        "Habitat": "Bosques montanos y selvas nubladas de los Andes.",
                        "Alimentacion": "Es frugívoro, alimentándose principalmente de frutas, pero también consume insectos y pequeños vertebrados.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 20 años.",
                        "Amenazas": "Pérdida de hábitat debido a la deforestación y la fragmentación del bosque.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' en la Lista Roja de la UICN debido a la pérdida de hábitat y la fragmentación de su población."
                    }
                },
                "Zamora Chinchipe": {
                    "PatoDeTorrente": {
                        "NombreComun": "Pato de Torrente",
                        "NombreCientifico": "Merganetta armata.",
                        "Habitat": "Ríos y arroyos de montaña con aguas rápidas y claras.",
                        "Alimentacion": "Es carnívoro, alimentándose principalmente de invertebrados acuáticos como insectos y crustáceos.",
                        "EsperanzaVida": "En la naturaleza, pueden vivir hasta 10-12 años.",
                        "Amenazas": "Contaminación del agua, la construcción de represas y la pérdida de hábitat ribereño.",
                        "EstadoConservacion": "Está clasificado como 'Casi Amenazado' en la Lista Roja de la UICN debido a la disminución de su hábitat y las amenazas a su entorno acuático."
                    }
                }
            };

        // Verificar si la provincia existe en el JSON
        if (infoEspecies[provincia]) {
            // Obtener la información de la especie (en este caso, solo la primera)
            const especie = Object.values(infoEspecies[provincia])[0];

            // Crear elementos HTML dinámicamente
            const container = document.createElement('div');
            container.innerHTML = `
                <span class="nombre-comun"><strong>${especie.NombreComun}</strong></span><br>
                <strong>Nombre Científico:</strong> ${especie.NombreCientifico}<br>
                <strong>Hábitat:</strong> ${especie.Habitat}<br>
                <strong>Alimentación:</strong> ${especie.Alimentacion}<br>
                <strong>Esperanza de Vida:</strong> ${especie.EsperanzaVida}<br>
                <strong>Amenazas:</strong> ${especie.Amenazas}<br>
                <strong>Estado de Conservación:</strong> ${especie.EstadoConservacion}
            `;

            // Agregar estilos CSS para el nombre común
            const nombreComun = container.querySelector('.nombre-comun');
            nombreComun.style.color = '#333';  // Color negro
            nombreComun.style.fontWeight = 'bold';  // Fuente en negrita
            nombreComun.style.fontSize = '16px';  // Tamaño de la fuente aumentado

            return container; // Devuelve el contenedor con elementos HTML
        } else {
            return 'Información no disponible para esta provincia.';
        }
    }

    // Función para obtener la ruta de la imagen según la provincia
    function obtenerImagenProvincia(provincia) {
        const imagenes = {
            "Azuay": 'images/condor.png',
            "Bolívar": 'images/oso_anteojos.jpg',
            "Carchi": 'images/jaguar.png',
            "Cañar": 'images/oso_hormiguero.jpeg',
            "Chimborazo": "images/llama.jpeg",
            "Cotopaxi": "images/lobo_paramo.jpeg",
            "El Oro": "images/mono_aullador.jpeg",
            "Esmeraldas": "images/delfin_rosado.jpg",
            "Galápagos": "images/tortuga_gigante.jpeg",
            "Guayas": "images/manati_caribe.jpeg",
            "Imbabura": "images/aguila_harpia.jpeg",
            "Loja": "images/tapir.jpg",
            "Los Ríos": "images/iguana_verde.jpeg",
            "Manabí": "images/ballena_jorobada.jpg",
            "Morona Santiago": "images/guacamayo.jpg",
            "Napo": "images/jaguar_2.jpg",
            "Orellana": "images/nutria_gigante_rio.jpg",
            "Pastaza": "images/puerco_sahino.jpg",
            "Pichincha": "images/oso_andino.jpg",
            "Santa Elena": "images/tortuga_verde.jpg",
            "Santo Domingo de los Tsáchilas": "images/guacamayo_azul_amarillo.jpg",
            "Sucumbíos": "images/puma.jpg",
            "Tungurahua": "images/tucan_andino.jpg",
            "Zamora Chinchipe": "images/pato_torrente.jpg"
        };

        return imagenes[provincia] || 'images/default.png'; // Imagen por defecto si no se encuentra la provincia
    }

    // Función para obtener la ruta del sonido según la provincia
    function obtenerSonidoProvincia(provincia) {
        const sonidos = {
            "Azuay": 'sounds/sonidoCondor.mp3',
            "Bolívar": 'sounds/sonidoOso.mp3',
            "Carchi": 'sounds/sonidoJaguar.mp3',
            "Cañar": 'sounds/sonidoOsoHormiguero.mp3',
            "Chimborazo": 'sounds/sonidoLlama.mp3',
            "Cotopaxi": 'sounds/sonidoLoboParamo.mp3',
            "El Oro": 'sounds/sonidoMonoAullador.mp3',
            "Esmeraldas": 'sounds/sonidoDelfinRosado.mp3',
            "Galápagos": 'sounds/sonidoTortuga.mp3',
            "Guayas": 'sounds/sonidoManatiCaribe.mp3',
            "Imbabura": 'sounds/sonidoAguilaHarpia.mp3',
            "Loja": 'sounds/sonidoTapir.mp3',
            "Los Ríos": 'sounds/sonidoIguanaVerde.mp3',
            "Manabí": 'sounds/sonidoBallenaJorobada.mp3',
            "Morona Santiago": 'sounds/sonidoGuacamayo.mp3',
            "Napo": 'sounds/sonidoJaguar.mp3',
            "Orellana": 'sounds/sonidoNutria.mp3',
            "Pastaza": 'sounds/sonidoPuercoSahino.mp3',
            "Pichincha": 'sounds/sonidoOso.mp3',
            "Santa Elena": 'sounds/sonidoTortuga.mp3',
            "Santo Domingo de los Tsáchilas": 'sounds/sonidoGuacamayoAzulAmarillo.mp3',
            "Sucumbíos": 'sounds/sonidoPuma.mp3',
            "Tungurahua": 'sounds/sonidoTucanAndino.mp3',
            "Zamora Chinchipe": 'sounds/sonidoPatoTorrente.mp3',
        };

        return sonidos[provincia]; // Devuelve undefined si no se encuentra la provincia
    }
});
