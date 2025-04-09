import React from 'react';
import { useQuizContext } from '../../context/QuizContext';
import SummaryStats from './SummaryStats';
import QuizComplete from '../../assets/quiz-complete.png';
import { ANSWER_STATE } from '../../data/constants';
/**
 * 결과 페이지
 */
const Summary = () => {
  const { questions, userAnswers, calculateStats } = useQuizContext();
  const stats = calculateStats();

  return (
    <div id="summary">
      <img src={QuizComplete} alt="Quiz Complete" />
      <h2>QUIZ COMPLETED!</h2>

      <SummaryStats stats={stats} />

      <ol>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          let answerClass = '';
          let answerText = '';

          // 정답 상태에 따라 클래스 및 텍스트 설정
          if (userAnswer === ANSWER_STATE.SKIPPED) {
            answerClass = ANSWER_STATE.SKIPPED;
            answerText = ANSWER_STATE.SKIPPED;
          } else if (userAnswer === question.correctAnswer) {
            answerClass = ANSWER_STATE.CORRECT;
            answerText = question.answers[userAnswer];
          } else {
            answerClass = ANSWER_STATE.WRONG;
            answerText = question.answers[userAnswer];
          }

          return (
            <li key={question.id}>
              <h3>{index + 1}</h3>
              <p className="question">{question.question}</p>
              <p className={`user-answer ${answerClass}`}>
                {answerText}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;