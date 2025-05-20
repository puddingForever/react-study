import { useCallback, useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { AnswerContext } from "./context/answerContext";
import QUESTION from "./question.js";
import CompleteImage from "./assets/quiz-complete.png";
function App() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [answerState, setAnswerState] = useState("");
  //아직고른 답이 없으면 0 있으면 등록된 답변 수-1(현재 인덱스)
  const [activeIndex, setActiveIndex] = useState(0);
  const handleGetSelectAnswer = useCallback(
    function handleGetSelectAnswer(selectedAnswer) {
      //넘어가기 전 선택된 답변의 색상 변경 로직 추가
      setAnswerState("answered");
      //답변을 클릭하면 선택한 답변이 목록에 쌓인다.
      setUserAnswer((prev) => {
        return [...prev, selectedAnswer];
      });
      setActiveIndex((prev) => prev + 1);
      setTimeout(() => {
        if (selectedAnswer === QUESTION[activeIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeIndex]
  );

  if (activeIndex === QUESTION.length) {
    //함수 실행 종료
    return (
      <div id="summary">
        <img src={CompleteImage} alt="CompleteImage" />
      </div>
    );
  }
  const answerValue = {
    userAnswer,
    answerState,
    activeIndex: answerState === "" ? userAnswer.length : userAnswer.length - 1,
    handleGetSelectAnswer,
  };

  return (
    <AnswerContext.Provider value={answerValue}>
      <Header />
      <main>
        <Quiz />
      </main>
    </AnswerContext.Provider>
  );
}

export default App;
