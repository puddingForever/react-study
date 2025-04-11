export const initialState = {
  currentQuestionIndex: 0,
  currentProgress: 100,
  selectedAnswer: null,
  score: 0,
  isAnswered: false,
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,
        isAnswered: true,
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        currentProgress: action.payload,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload,
      };
    case 'NEXT_QUIZ':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentProgress: 100,
        isAnswered: false,
      };
    case 'RESET_QUIZ':
      return {
        ...initialState,
      };
  }
};
