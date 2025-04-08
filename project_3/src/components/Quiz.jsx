import { useState } from "react";
import QUESTION from "../question.js";
import CompleteImage from "../assets/quiz-complete.png";

export default function Quiz() {
  //현재 활성화된 질문을 관리하고 다른 질문으로 변경
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuertionIndex = userAnswer.length;

  const handleGetSelectAnswer = (answer) => {
    setUserAnswer((prev) => {
      return [...prev, answer];
    });
  };

  if (activeQuertionIndex === QUESTION.length) {
    //함수 실행 종료
    return (
      <div id="summary">
        <img src={CompleteImage} alt="CompleteImage" />
      </div>
    );
  }
  const sufferedAnswers = [...QUESTION[activeQuertionIndex].answers];
  sufferedAnswers.sort(() => {
    return Math.random() - 0.5;
  });

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTION[activeQuertionIndex].text}</h2>
        <ul id="answers">
          {sufferedAnswers.map((question, idx) => {
            return (
              <li key={idx} className="answer">
                <button onClick={() => handleGetSelectAnswer(question)}>
                  {question}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
