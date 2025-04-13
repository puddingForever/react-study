import { useContext, useRef } from "react";
import QUESTION from "../question.js";
import { AnswerContext } from "../context/answerContext.jsx";
export default function Answer() {
  const { activeIndex, userAnswer, answerState, handleGetSelectAnswer } =
    useContext(AnswerContext);

  const sufferedAnswersRef = useRef(QUESTION[0].answers);
  if (!sufferedAnswersRef.current) {
    sufferedAnswersRef.current = [...QUESTION[activeIndex].answers];
    sufferedAnswersRef.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {[...QUESTION[activeIndex].answers].map((answer, idx) => {
        const isSelected = userAnswer[userAnswer.length - 1] === answer;
        let cssClass = "selected";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={idx} className="answer">
            <button
              onClick={() => handleGetSelectAnswer(answer)}
              className={cssClass}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
