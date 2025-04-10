import { useCallback, useState } from "react";
import QUESTION from "../question.js";
import CompleteImage from "../assets/quiz-complete.png";
import Timer from "./Timer.jsx";

export default function Quiz() {
  //현재 활성화된 질문을 관리하고 다른 질문으로 변경
  //답변이 선택될 때마다 재랜더링
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuertionIndex = userAnswer.length;

  //답변을 클릭하면 선택한 답변이 목록에 쌓인다.
  const handleGetSelectAnswer = useCallback((answer) => {
    setUserAnswer((prev) => {
      return [...prev, answer];
    });
  }, []);

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

  //자식 컴포넌트가 받는 props가 "새 객체/새 함수"면 부모, 자식 다시 리랜더링
  //useCallback 통해 같은 함수 참조 유지
  const handleSkipAnswer = useCallback(
    () => handleGetSelectAnswer(null),
    [handleGetSelectAnswer]
  );
  return (
    <div id="quiz">
      <div id="question">
        {/* 
        부모 컴포넌트가 리랜더링 되면 자식(Timer)의 props를 이전과 비교
        timeout=10000 이전과 같음, handleSkipAnswer useCallback 으로 이전과 같음
        → 메모리 안 객체가 유지되면서 useEffect 내부 실행 X
        */}
        <Timer
          key={activeQuertionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
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
