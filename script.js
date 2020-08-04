const startBtn = document.querySelector('.start')
const nextBtn = document.querySelector('.next-btn')
const quiz = document.querySelector('.quiz-box')
const question = document.querySelector('.question')
const listQuiz = document.querySelector('.list-quiz')
const counter = document.querySelector('.counter')


counter.classList.add('hide')

let counterCorrectAnswers = 1


let questionsArray,
  currentQuestionIndex;

// Очищаем классы у элементов
const clearStatusClass = (elem) => {
  elem.classList.remove('correct')
  elem.classList.remove('wrong')
}

// при переходе на другой вопрос удаляем старые ответы
const resetState = () => {
  nextBtn.style.display = 'none'

  while (listQuiz.firstChild) {
    listQuiz.removeChild(listQuiz.firstChild)
  }
}

// добавляем классы "правильно" "не правильно" элементам при выборе
const setStatusClass = (elem, status) => {

  clearStatusClass(elem)

  if (status) {
    elem.classList.add('correct')
  } else {
    elem.classList.add('wrong')
  }
}



// выбор ответа и добавление класса при нажатии
const selectAnswer = (e) => {

  const selectBtn = e.target

  if (selectBtn.dataset.correct) {
    counter.innerHTML = `
    Your score: ${counterCorrectAnswers++}/${questionsArray.length}
    <br>
    ${counterCorrectAnswers > 3 ? "Test passed!" : "Test failed!"}
    `
    console.log(counterCorrectAnswers);
  } else {
    selectBtn.style.backgroundColor = 'red'
  }

  const correct = selectBtn.dataset.correct
  setStatusClass(document.body, correct)

  Array.from(listQuiz.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct)
  })
  if (questionsArray.length > currentQuestionIndex + 1) {
    nextBtn.style.display = 'block'
  } else {
    setTimeout(() => {
      counter.style.display = 'block'
      quiz.classList.add('hide')
    }, 1000)
  }
}



// показываем вопрос и ответы
const showQuestions = (arr) => {
  resetState()
  question.innerHTML = arr.question

  arr.answers.forEach(answer => {

    const li = document.createElement('li')
    li.classList.add('list-quiz__item')
    li.innerHTML = answer.text

    if (answer.correct) {
      li.dataset.correct = answer.correct
    }

    li.addEventListener('click', selectAnswer)
    listQuiz.appendChild(li)

  })
}

// выводим вопрос на страницу
const setNextQuestions = function () {
  showQuestions(questionsArray[currentQuestionIndex])
}



const startGame = function () {
  this.style.display = 'none'
  questionsArray = questions
  currentQuestionIndex = 0
  quiz.classList.remove('hide')
  setNextQuestions()
}


startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestions()
})
