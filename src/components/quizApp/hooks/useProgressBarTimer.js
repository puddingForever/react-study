import { useEffect } from 'react';
import { useQuizContext } from '../context/quiz-provider';

// 프로그래스바 컨트롤
export const useProgressBarTimer = () => {
  const { state, dispatch } = useQuizContext();
  const { currentProgress, currentQuestionIndex } = state;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: state.currentProgress - 20,
      });

      if (currentProgress <= 0) {
        dispatch({ type: 'NEXT_QUIZ' });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // 퀴즈가 변경될때마다 실행
  }, [dispatch, state.currentProgress]);

  // 프로그래스바 진행 빠르게
  const fasterProgress = () => {
    setInterval(() => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: currentProgress - 20 });
    }, 100);
  };

  return { currentProgress, fasterProgress };
};
