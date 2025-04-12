import { useCallback, useContext } from "react";
import Answer from "./Answer";
import Timer from "./Timer";
import QUESTION from "../question.js";
import { AnswerContext } from "../context/answerContext.jsx";
export default function Card() {
  const { handleGetSelectAnswer, activeIndex } = useContext(AnswerContext);
  const handleSkipAnswer = useCallback(
    () => handleGetSelectAnswer(null),
    [handleGetSelectAnswer]
  );
  return (
    <div id="question">
      {/* 
  부모 컴포넌트가 리랜더링 되면 자식(Timer)의 props를 이전과 비교
  timeout=10000 이전과 같음, handleSkipAnswer useCallback 으로 이전과 같음
  → 메모리 안 객체가 유지되면서 useEffect 내부 실행 X
  */}
      <Timer timeout={10000} onTimeout={handleSkipAnswer} />
      <h2>{QUESTION[activeIndex].text}</h2>
      <Answer QUESTION={QUESTION} />
    </div>
  );
}
