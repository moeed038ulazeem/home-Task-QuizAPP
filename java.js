// script.js

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5"],
        correct: "4"
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: ["Earth", "Jupiter", "Saturn"],
        correct: "Jupiter"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway"],
        correct: "Harper Lee"
    },
    {
        question: "What is the boiling point of water in degrees Celsius?",
        answers: ["100", "90", "80"],
        correct: "100"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');

function showQuestion(question) {
    questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.answers.map(answer => `
            <label>
                <input type="radio" name="answer" value="${answer}"> ${answer}
            </label>
        `).join('')}
    `;
}

function showResult() {
    resultContainer.innerHTML = `
        <h2>Your Score: ${score} out of ${questions.length}</h2>
        ${questions.map((question, index) => {
            const userAnswer = localStorage.getItem(`q${index}`);
            const correctAnswer = question.correct;
            if (userAnswer === correctAnswer) {
                return `<p class="correct">Question ${index + 1}: Correct (Answer: ${correctAnswer})</p>`;
            } else {
                return `<p class="incorrect">Question ${index + 1}: Incorrect. Your Answer: ${userAnswer || 'None'}. Correct Answer: ${correctAnswer}</p>`;
            }
        }).join('')}
    `;
    resultContainer.classList.remove('hidden');
}

function handleAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerValue = selectedAnswer.value;
        localStorage.setItem(`q${currentQuestionIndex}`, answerValue);

        if (answerValue === questions[currentQuestionIndex].correct) {
            score++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            // All questions answered, show results
            questionContainer.classList.add('hidden');
            nextButton.classList.add('hidden');
            showResult();
        }
    } else {
        alert('Please select an answer.');
    }
}

nextButton.addEventListener('click', handleAnswer);

// Start the quiz
showQuestion(questions[currentQuestionIndex]);
