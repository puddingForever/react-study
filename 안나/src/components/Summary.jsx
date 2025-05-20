import React, { useContext } from "react";
import quizLogoImg from "../assets/quiz-complete.png";
import { UserAnswerContext } from "../store/user-answer-context.jsx";

// 퀴즈가 끝났을 때 결과 요약 화면을 보여주는 컴포넌트
function Summary(props) {
  const { userAnswer } = useContext(UserAnswerContext); // 컨텍스트에서 사용자 답안 배열 가져오기

  const totalQuestions = userAnswer.length; // 총 문제 수

  // 정답, 오답, 건너뛴 문제 수 계산
  const correctAnswers = userAnswer.filter(
    (answer) => answer.result === "correct",
  ).length;
  const wrongAnswers = userAnswer.filter(
    (answer) => answer.result === "wrong",
  ).length;
  const skippedAnswers = userAnswer.filter(
    (answer) => answer.result === "skipped",
  ).length;

  // 각각의 비율을 백분율로 계산
  const getPercentage = (count) => Math.round((count / totalQuestions) * 100);
  const correctPercentage = getPercentage(correctAnswers);
  const wrongPercentage = getPercentage(wrongAnswers);
  const skippedPercentage = getPercentage(skippedAnswers);

  return (
    <section id="summary">
      <img src={quizLogoImg} alt="Quiz Logo Image" />
      <h2>QUIZ COMPLETED!</h2>

      {/* 정답/오답/스킵 비율을 보여주는 영역 */}
      <div id="summary-stats">
        <span>
          <p className="number">{skippedPercentage}%</p>
          <p className="text">SKIPPED</p>
        </span>
        <span>
          <p className="number">{correctPercentage}%</p>
          <p className="text">ANSWERED CORRECTLY</p>
        </span>
        <span>
          <p className="number">{wrongPercentage}%</p>
          <p className="text">ANSWERED INCORRECTLY</p>
        </span>
      </div>

      {/* 개별 문제에 대한 정답/오답 표시 목록 */}
      <ol>
        {userAnswer.map((answer, index) => {
          const { id, question, selectedAnswer, result } = answer;

          return (
            <li key={id}>
              <h3>{index + 1}</h3>
              <div className="question">{question}</div>

              {/* 스킵된 경우와 아닌 경우에 따라 다르게 출력 */}
              {result === "skipped" ? (
                <p className="user-answer wrong">SKIPPED</p>
              ) : (
                <div className="answer">
                  {/* 정답 or 오답에 따라 클래스 적용 */}
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
