import { useQuizContext } from '../context/quiz-provider';

// 정답핸들러
export const useAnsweredHandler = () => {
  const { state, questions } = useQuizContext();
  const { currentQuestionIndex } = state;
  const isCorrect =
    state.userAnswer === questions[currentQuestionIndex].answers[0];

  return {
    isCorrect,
  };
};
