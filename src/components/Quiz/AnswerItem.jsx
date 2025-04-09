import React, { useState, useEffect } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import { TIMER_STATE, ANSWER_STATE } from '../../data/constants';
/**
 * 보기 항목
 * 현재 문제에 대한 정보는 props로, 다른 데이터는 QuizContext에서 관리
 */
const AnswerItem = ({ answer, index, isCorrect }) => {
  const { handleAnswer, userAnswers, currentQuestionIndex, timerState } = useQuizContext();
  const [buttonClass, setButtonClass] = useState('');

  const userAnswer = userAnswers[currentQuestionIndex];
  // 사용자가 답을 선택했는지 여부
  const isAnswered = userAnswer !== null && userAnswer !== ANSWER_STATE.SKIPPED;

  useEffect(() => {
    if (isAnswered) {
      // 유저가 선택한 항목일때
      if (index === userAnswer) {
        // 답 선택 단계에는 노란색으로 표시
        if (timerState === TIMER_STATE.ANSWERED) {
          setButtonClass(ANSWER_STATE.SELECTED);
        }
        // 정답 확인 단계에서 정답인지 여부에 따라 색상 변경
        else if (timerState === TIMER_STATE.CHECKING) {
          setButtonClass(isCorrect ? ANSWER_STATE.CORRECT : ANSWER_STATE.WRONG);
        }
      }
    } else {
      setButtonClass('');
    }
  }, [isAnswered, userAnswer, isCorrect, index, timerState]);

  return (
    <li className="answer">
      <button
        onClick={() => !isAnswered && handleAnswer(index)}
        className={buttonClass}
        disabled={isAnswered}
      >
        {answer}
      </button>
    </li>
  );
};

export default AnswerItem;