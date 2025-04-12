export const initialState = {
  currentQuestionIndex: 0, // 다음퀴즈 추적용 인덱스
  currentProgress: 100, // 프로그래스바
  selectedAnswer: null, // 사용자가 선택한 답변
  answers: [], // 최종 오브젝트 배열
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    case "STORE_ANSWER":
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            userAnswer: action.payload.userAnswer,
            questionText: action.payload.questionText,
            isCorrect: action.payload.isCorrect,
            isSkipped: action.payload.isSkipped,
          },
        ],
      };
    case "UPDATE_PROGRESS":
      return {
        ...state,
        currentProgress: action.payload,
      };
    case "NEXT_QUIZ":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentProgress: 100,
        selectedAnswer: null,
      };
  }
};
