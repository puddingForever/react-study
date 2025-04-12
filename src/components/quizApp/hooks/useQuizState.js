import { useQuizContext } from "../context/quiz-provider";

// 퀴즈 반환
export const useQuizState = () => {
  const { state, questions } = useQuizContext();
  const { currentQuestionIndex } = state;

  // 현재 퀴즈
  const currentQuestion = questions[currentQuestionIndex];

  // 퀴즈 완료할 때
  const isComplete = questions.length <= currentQuestionIndex;

  return { currentQuestion, isComplete };
};
