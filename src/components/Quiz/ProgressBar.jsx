import React from 'react';
import { useQuizContext } from '../../context/QuizContext';
/**
 * 진행 바를 출력
 */
const ProgressBar = () => {
  const { timerProgress, timerState } = useQuizContext();

  // 기본 / 답 선택 / 정답 확인 상태에 따라 클래스 변경
  return (
    <progress
      value={timerProgress}
      max="100"
      className={timerState}
    />
  );
};

export default ProgressBar;