import React from 'react';
import Question from './Question';
import AnswersList from './AnswersList';
import { useQuizContext } from '../../context/QuizContext';
/**
 * 퀴즈를 출력하는 페이지
 * 출력하는 문제는 QuizContext에서 관리
 */
const Quiz = () => {
  const { currentQuestionIndex, questions } = useQuizContext();
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div id="quiz">
        <Question
          question={currentQuestion.question}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
        <AnswersList
          answers={currentQuestion.answers}
          correctAnswer={currentQuestion.correctAnswer}
        />
      </div>
    </>
  );
};

export default Quiz;