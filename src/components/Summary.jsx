import React, { useContext } from "react";
import quizLogoImg from "../assets/quiz-complete.png";
import { UserAnswerContext } from "../store/user-answer-context.jsx";

function Summary(props) {
  const { userAnswer } = useContext(UserAnswerContext);
  const totalQuestions = userAnswer.length;
  const correctAnswers = userAnswer.filter(
    (answer) => answer.result === "correct",
  ).length;
  const wrongAnswers = userAnswer.filter(
    (answer) => answer.result === "wrong",
  ).length;
  const skippedAnswers = userAnswer.filter(
    (answer) => answer.result === "skipped",
  ).length;

  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const wrongPercentage = Math.round((wrongAnswers / totalQuestions) * 100);
  const skippedPercentage = Math.round((skippedAnswers / totalQuestions) * 100);

  return (
    <section id="summary">
      <img src={quizLogoImg} alt="Quiz Logo Image" />
      <h2>QUIZ COMPLETED!</h2>
      <div id="summary-stats">
        <span>
          <p className="number">{skippedPercentage}%</p>
          <p className="text">SKIPPEND</p>
        </span>
        <span>
          <p className="number">{correctPercentage}%</p>
          <p className="text">ANSWERED CORRECTLY</p>
        </span>
        <span>
          <p className="number">{wrongPercentage}%</p>
          <p className="text">ANSWERED INCORECTLY</p>
        </span>
      </div>
      <ol>
        {userAnswer.map((answer, index) => {
          const { id, question, selectedAnswer, result } = answer;
          return (
            <li key={id}>
              <h3>{index + 1}</h3>
              <div className="question">{question}</div>
              {result === "skipped" ? (
                <p className="user-answer wrong">SKIPPED</p>
              ) : (
                <div className="answer">
                  <p className={`user-answer ${result}`}>{selectedAnswer}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Summary;
