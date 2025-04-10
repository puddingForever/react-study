import { useState } from "react";
import QUESTION from "../question.js";
import CompleteImage from "../assets/quiz-complete.png";
import Timer from "./Timer.jsx";

export default function Quiz() {
  //현재 활성화된 질문을 관리하고 다른 질문으로 변경
  //답변이 선택될 때마다 재랜더링
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuertionIndex = userAnswer.length;

  //답변을 클릭하면 선택한 답변이 목록에 쌓인다.
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
        <Timer
          key={activeQuertionIndex}
          timeout={10000}
          onTimeout={() => handleGetSelectAnswer(null)}
        />
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
