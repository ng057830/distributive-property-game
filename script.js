// Questions and answers data
const steps = [
    {
        question: 'Primero, identifica y escribe el término que está fuera del paréntesis.',
        answer: '5m^2',
        hint: 'Observa el número y la variable que multiplican al paréntesis.',
        inputType: 'text',
        validate: function(input) {
            return input.replace(/\s+/g, '').toLowerCase() === '5m^2';
        }
    },
    {
        question: 'Ahora, vamos a aplicar la propiedad distributiva. Multiplica \(5m^2\) por el primer término dentro del paréntesis: \(4mn\). Escribe el resultado.',
        answer: '20m^3n',
        hint: 'Multiplica los coeficientes y suma los exponentes de las variables iguales.',
        inputType: 'text',
        validate: function(input) {
            return input.replace(/\s+/g, '').toLowerCase() === '20m^3n';
        }
    },
    {
        question: 'Multiplica \(5m^2\) por el segundo término: \(2n^2\). Escribe el resultado.',
        answer: '10m^2n^2',
        hint: 'Multiplica los coeficientes y combina las variables correctamente.',
        inputType: 'text',
        validate: function(input) {
            return input.replace(/\s+/g, '').toLowerCase() === '10m^2n^2';
        }
    },
    {
        question: 'Multiplica \(5m^2\) por el tercer término: \(-3m\). Escribe el resultado.',
        answer: '-15m^3',
        hint: 'No olvides el signo negativo y suma los exponentes de las variables m.',
        inputType: 'text',
        validate: function(input) {
            return input.replace(/\s+/g, '').toLowerCase() === '-15m^3';
        }
    },
    {
        question: 'Finalmente, escribe el resultado completo de la multiplicación.',
        answer: '20m^3n + 10m^2n^2 - 15m^3',
        hint: 'Combina todos los términos obtenidos manteniendo sus signos.',
        inputType: 'text',
        validate: function(input) {
            const cleanedInput = input.replace(/\s+/g, '').toLowerCase();
            const correctAnswer = '20m^3n+10m^2n^2-15m^3';
            return cleanedInput === correctAnswer;
        }
    }
];

// Game variables
let currentStep = 0;

// Initialize game
function initGame() {
    showStep(currentStep);
}

// Display current step
function showStep(stepIndex) {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    const step = steps[stepIndex];

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<p>${step.question}</p>`;
    gameDiv.appendChild(questionDiv);

    const inputElement = document.createElement('input');
    inputElement.type = step.inputType;
    inputElement.id = 'userInput';
    gameDiv.appendChild(inputElement);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    submitButton.onclick = checkAnswer;
    gameDiv.appendChild(submitButton);

    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    gameDiv.appendChild(feedbackDiv);

    renderMathInElement(gameDiv, {
        delimiters: [
            {left: "\\(", right: "\\)", display: false},
            {left: "\\[", right: "\\]", display: true}
        ]
    });
}

// Check user's answer
function checkAnswer() {
    const userInput = document.getElementById('userInput').value;
    const feedbackDiv = document.getElementById('feedback');
    const step = steps[currentStep];

    if (step.validate(userInput)) {
        feedbackDiv.innerHTML = '<p class="correct">¡Correcto!</p>';
        currentStep++;
        if (currentStep < steps.length) {
            setTimeout(() => showStep(currentStep), 1000);
        } else {
            feedbackDiv.innerHTML += '<p>¡Has completado el ejercicio!</p>';
        }
    } else {
        feedbackDiv.innerHTML = `<p class="error">Incorrecto. Pista: ${step.hint}</p>`;
    }
}

// Start the game when the page loads
window.onload = initGame;
