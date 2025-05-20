import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";
import QUIZS from "./constants/nonsense_questions_ko.js";
// import QUIZS from "./questions.js";
import { useState } from "react";
import UserAnswerContextProvider from "./store/user-answer-context.jsx";
import _ from "lodash"; // lodash 라이브러리 (배열 셔플링)

function App() {
  // 현재 화면 모드를 상태로 관리 (퀴즈 화면 또는 결과 화면)
  const [viewMode, setViewMode] = useState("quiz");

  // QUIZS에서 문제를 가져와서 순서를 섞고, 각 문제에 대한 답변 순서도 섞음
  const shuffledQuizzes = _.shuffle(QUIZS).map((quiz) => ({
    ...quiz,
    answers: _.shuffle(quiz.answers), // 답안 순서 셔플
    correctAnswer: quiz.answers[0], // 첫 번째 답안을 정답으로 설정
  }));

  // 화면 모드를 변경하는 함수 (퀴즈 화면 -> 결과 화면)
  function handleViewModeChange(mode) {
    // 추후 Start 페이지 추가하여 퀴즈 화면으로 이동 가능
    setViewMode(mode); // 새로운 화면 모드로 상태 업데이트
  }

  return (
    <>
      <Header /> {/* 상단 헤더 컴포넌트 표시 */}
      {/*UserAnswerContextProvider로 감싸서 Quiz에서 사용자 답변 상태를 관리*/}
      <UserAnswerContextProvider>
        {/* viewMode 상태에 따라 퀴즈 화면 또는 결과 화면을 렌더링 */}
        {viewMode === "quiz" && (
          <Quiz quizzes={shuffledQuizzes} onQuizEnd={handleViewModeChange} /> // 퀴즈 화면
        )}
        {
          viewMode === "summary" && <Summary /> // 결과 화면
        }
      </UserAnswerContextProvider>
    </>
  );
}

export default App; // App 컴포넌트를 내보냄
