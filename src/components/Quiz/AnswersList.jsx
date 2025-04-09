import React from 'react';
import AnswerItem from './AnswerItem';
/**
 * 보기 목록을 출력
 */
const AnswersList = ({ answers, correctAnswer }) => {
  return (
    <ul id="answers">
      {answers.map((answer, index) => (
        <AnswerItem
          key={index}
          answer={answer}
          index={index}
          isCorrect={index === correctAnswer}
        />
      ))}
    </ul>
  );
};

export default AnswersList;