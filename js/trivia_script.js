document.addEventListener('DOMContentLoaded', function() {
    const questionContainer = document.getElementById('question');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    const optionC = document.getElementById('optionC');
    const feedback = document.getElementById('feedback');
    const countdown = document.getElementById('countdown');
    const progress = document.getElementById('progress');
    const timer = document.getElementById('timer');
    const backgroundMusic = document.getElementById('background-music');

    const questionsFile = 'questions.json'; // Nombre del archivo JSON con las preguntas
    let questions = []; // Arreglo para almacenar las preguntas cargadas
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let timerCount = 60; // Tiempo inicial en segundos
    const numberOfQuestions = 5; // Cantidad de preguntas a mostrar por partida

    // Función para cargar las preguntas desde el archivo JSON
    function loadQuestions(callback) {
        fetch(questionsFile)
            .then(response => response.json())
            .then(data => {
                // Obtener todas las preguntas del archivo JSON
                const allQuestions = Object.entries(data).map(([question, options]) => {
                    const { OpcionA, OpcionB, OpcionC, OpcionCorrecta } = options;
                    return {
                        question,
                        options: {
                            OpcionA,
                            OpcionB,
                            OpcionC,
                            OpcionCorrecta
                        }
                    };
                });

                // Seleccionar aleatoriamente 5 preguntas
                questions = selectRandomQuestions(allQuestions, numberOfQuestions);
                callback();
            })
            .catch(error => console.error('Error al cargar las preguntas:', error));
    }

    // Función para seleccionar preguntas aleatorias
    function selectRandomQuestions(allQuestions, numberToSelect) {
        const shuffled = allQuestions.sort(() => 0.5 - Math.random()); // Desordenar aleatoriamente
        return shuffled.slice(0, numberToSelect); // Obtener las primeras `numberToSelect` preguntas
    }

    // Función para mostrar una pregunta y sus opciones
    function displayQuestion(index) {
        const { question, options } = questions[index];
        questionContainer.textContent = question;
        optionA.textContent = options.OpcionA;
        optionB.textContent = options.OpcionB;
        optionC.textContent = options.OpcionC;
    }

    // Función para manejar la selección de una opción
    function selectOption(selectedOption) {
        const { options } = questions[currentQuestionIndex];
        const selectedAnswer = options[selectedOption];
        const correctAnswer = options.OpcionCorrecta;

        if (selectedAnswer === correctAnswer) {
            feedback.textContent = '¡Respuesta correcta!';
            feedback.style.color = 'green';
            correctAnswers++;
        } else {
            feedback.textContent = `Respuesta incorrecta. La respuesta correcta es: ${correctAnswer}`;
            feedback.style.color = 'red';
            incorrectAnswers++;
        }

        currentQuestionIndex++;
        progress.textContent = `Pregunta ${currentQuestionIndex + 1} de ${numberOfQuestions}`;

        // Mostrar siguiente pregunta o resultados finales
        if (currentQuestionIndex < numberOfQuestions) {
            displayQuestion(currentQuestionIndex);
        } else {
            endGame();
        }
    }

    // Función para terminar el juego cuando se responden todas las preguntas
    function endGame() {
        clearInterval(timerInterval);
        timer.style.display = 'none';
        optionA.disabled = true;
        optionB.disabled = true;
        optionC.disabled = true;
        feedback.textContent = `Juego terminado. Resultados: Correctas: ${correctAnswers}, Incorrectas: ${incorrectAnswers}`;

        // Limpiar contenido de preguntas y opciones al finalizar
        questionContainer.textContent = '';
        optionA.textContent = '';
        optionB.textContent = '';
        optionC.textContent = '';
        progress.textContent = '';
    }

    // Función para actualizar el contador de tiempo
    function updateTimer() {
        timerCount--;
        countdown.textContent = timerCount;

        if (timerCount <= 10) {
            countdown.style.color = 'red';
        }
        if (timerCount === 0) {
            endGame();
        }
    }

    // Función para iniciar el juego
    function startGame() {
        loadQuestions(() => {
            // Mostrar la primera pregunta
            displayQuestion(currentQuestionIndex);

            // Iniciar el temporizador
            timerInterval = setInterval(updateTimer, 1000);

            // Habilitar selección de opciones
            optionA.addEventListener('click', () => selectOption('OpcionA'));
            optionB.addEventListener('click', () => selectOption('OpcionB'));
            optionC.addEventListener('click', () => selectOption('OpcionC'));
        });
    }

    // Iniciar el juego cuando se carga la página
    startGame();

    // Opcional: Reproducir música de fondo
    backgroundMusic.play();
});