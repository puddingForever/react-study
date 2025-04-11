import { useEffect } from 'react';
import { useQuizContext } from '../context/quiz-provider';

// 퀴즈상태 컨트롤
// 1.타이머 끝났을 때 2.퀴즈 완료할 때
export const useQuizState = () => {
  const { state, dispatch, questions } = useQuizContext();
  const { currentQuestionIndex, currentProgress } = state;

  // 1.타이머끝났을 때
  useEffect(() => {
    if (currentProgress <= 0) {
      dispatch({ type: 'NEXT_QUIZ' });
    }
  }, [currentProgress, dispatch]);

  // 현재 퀴즈
  const currentQuestion = questions[currentQuestionIndex];

  // 2.퀴즈 완료할 때
  const isComplete = questions.length <= currentQuestionIndex;

  return { currentQuestion, isComplete };
};
