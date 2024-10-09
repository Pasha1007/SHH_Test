const burger = document.getElementById("burger");
const mobileNav = document.querySelector(".nav-mobile")
const quizBg = document.getElementById("quiz-bg");
let currentQuestion = 0;
const answers = [];
const questions = [
    { question: "Is the penis 8 inches or more in length?", image: "./images/quizPics/doc1.png" },
    { question: "Have you exppirienced erectile problems or decrease in libido?", image: "./images/quizPics/doc2.png" },
    { question: "Are you currently taking any medications or supplements that might affect your sexual health?", image: "./images/quizPics/doc3.png" },
    { question: "Do you have any underlying health conditions, such as diabetes or hypertension?", image: "./images/quizPics/doc4.png" },
    { question: "Have you ever undergone any previous treatments or surgeries for sexual enhancement or related issues?", image: "./images/quizPics/doc5.png" },
    { question: "How important is it for you to have access to safe and effective medication for enhancing your sexual health?", image: "./images/quizPics/doc6.png" },
    { question: "Do you think your wife is satisfied with the size of your penis?", image: "./images/quizPics/doc7.png" }
  ];

const questionTxt = document.getElementById('question');
const quizImg = document.getElementById('quiz-img');
const questionNumbers = document.querySelectorAll('.quest-number span');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const modal = document.getElementById('quiz-modal');
const form = document.getElementById('quiz-form')
const emailInput = document.getElementById('email-input');
const sendEmail = document.getElementById('send-email');
let timer;
const timerDisplay = document.getElementById('timer'); 
const errorAlert = document.getElementById('error')

document.querySelectorAll('a').forEach(anchor => {
    anchor.href = '#quiz-section'; 
    anchor.addEventListener('click', function(event) {
        document.getElementById('quiz-section');
    });
});

burger.onclick = function() {
    mobileNav.classList.toggle("active");
};

function updateImageSrc() {
    if (window.innerWidth >= 1024) {
        quizBg.src = './images/quiz_bg.png'; 
    } else {
        quizBg.src = './images/quiz_bg_mobile.png'; 
    }
}

window.onload = updateImageSrc;
window.onresize = updateImageSrc;
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function startTimer() {
    var timeLeft = 120;
    timerDisplay.innerText = formatTime(timeLeft);
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timer); 
            modal.classList.add('hidden')
            
        }
    }, 1000);
}

function loadQuestion(index) {
    if (index < questions.length) {
        questionTxt.innerText = questions[index].question;
        quizImg.src = questions[index].image;
        questionTxt.classList.add('show');
        quizImg.classList.add('show');
        questionNumbers.forEach((num, i) => {
            if (i === index) {
             num.classList.add('active');
            } else {
                num.classList.remove('active');
            }
        });
    }else{
        modal.classList.remove('hidden');
        startTimer();
        console.log(answers)
    }
}
function handleAnswer(answer) {
    answers.push(answer);
    currentQuestion++; 
    loadQuestion(currentQuestion);
}
  
yesBtn.addEventListener('click', () => handleAnswer('yes'));
noBtn.addEventListener('click', () => handleAnswer('no'));
  
form.addEventListener('submit',async function(event) {
    if (!validateForm(event)) {
        event.preventDefault(); 
    }
    event.preventDefault();
    const email = emailInput.value;
    const data = {
        email:email,
        answers: answers
    }
    document.getElementById('answers-input').value = JSON.stringify(answers);
    try {
        const response = await fetch('submit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                email: email,
                answers: JSON.stringify(answers)
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Success:', result);

        window.location.href = 'success.php';
    } catch (error) {
        console.error('Error:', error);
    }
});

function validateForm(event) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
        event.preventDefault();
        errorAlert.classList.add('alert-active');
        errorAlert.innerHTML= "<i class='ri-alert-line ri-xl'></i>Невірно вказаний Email";
        emailInput.focus(); 
        return false;
    }
   
    return true;
}

loadQuestion(currentQuestion);
