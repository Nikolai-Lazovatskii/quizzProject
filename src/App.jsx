import { useEffect, useReducer } from "react";
import { useState } from "react";
import he from "he";
import "./App.css";
import Answers from "./components/answers";

import trueSound from "./assets/true.mp3";
import falseSound from "./assets/false.mp3";

const initialState = {
  correct: 0,
  incorrect: 0,
  click: false,
  number: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CORRECT":
      return { ...state, correct: state.correct + 1 };
    case "ADD_INCORRECT":
      return { ...state, incorrect: state.incorrect + 1 };
    case "CLICK":
      return { ...state, click: !state.click };
    case "NUMBER":
      return { ...state, number: state.number + 1 };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const trueClick = new Audio(trueSound);
  const falseClick = new Audio(falseSound);

  const checkAnswer = (event) => {
    const btnAnswer = event.target.innerText;
    correctAnswer === btnAnswer
      ? (dispatch({ type: "ADD_CORRECT" }), trueClick.play())
      : (dispatch({ type: "ADD_INCORRECT" }), falseClick.play());
    dispatch({ type: "NUMBER" });
    dispatch({ type: "CLICK" });
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=18")
      .then((response) => response.json())
      .then((data) => {
        const firstQuestion = data.results[0];
        setQuestion(firstQuestion.question);
        const shuffledAnswers = shuffleArray([
          firstQuestion.correct_answer,
          ...firstQuestion.incorrect_answers,
        ]);
        setAnswers(shuffledAnswers);
        setCorrectAnswer(firstQuestion.correct_answer);
      })
      .catch((error) => {
        console.log("Произошла ошибка:", error);
      });
  }, [state.click]);

  return (
    <div className="app">
      <header>
        <h2 className="headerTitle">Pet Project - QUIZZ</h2>
      </header>
      <div>
        <div className="results">
          <p className="correct">{state.correct}</p>
          <p className="uncorrect">{state.incorrect}</p>
        </div>
        <div className="questions">
          <p className="number">Question {state.number}</p>
          <h2 className="question">{he.decode(question)}</h2>
          <Answers answers={answers} checkAnswer={checkAnswer} />
        </div>
      </div>
      <footer>
        <p className="copyright">
          Nikolai Lazovatskii - ReactJS project - June 2023
        </p>
      </footer>
    </div>
  );
}

export default App;
