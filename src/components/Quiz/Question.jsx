import React from 'react';
import ProgressBar from './ProgressBar';
/**
 * 진행 바와 문제를 출력
 */
const Question = ({ question, currentIndex, totalQuestions }) => {
  return (
    <div id="question">
      <p id="question-overview">
        문제 {currentIndex + 1} / {totalQuestions}
      </p>
      <ProgressBar />
      <h2>{question}</h2>
    </div>
  );
};

export default Question;