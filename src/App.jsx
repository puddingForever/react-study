import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Summary from "./components/Summary.jsx";
import QUIZS from "./nonsense_questions_ko.js";
// import QUIZS from "./questions.js";
import _ from "lodash";
import { useState } from "react";
import UserAnswerContextProvider from "./store/user-answer-context.jsx";

function App() {
  const [viewMode, setViewMode] = useState("quiz");
  const shuffledQuizs = _.shuffle(QUIZS).map((quiz) => ({
    ...quiz,
    answers: _.shuffle(quiz.answers),
    correctAnswer: quiz.answers[0],
  }));

  function handleViewModeChange(newViewMode) {
    setViewMode(newViewMode);
  }

  return (
    <UserAnswerContextProvider>
      <Header />
      {viewMode === "quiz" ? (
        <Quiz quizs={shuffledQuizs} onQuizEnd={handleViewModeChange} />
      ) : (
        <Summary />
      )}
    </UserAnswerContextProvider>
  );
}
export default App;
