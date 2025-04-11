import { createContext, useContext, useReducer } from 'react';
import { QUESTIONS } from '../../../constants/constants';
import { initialState, quizReducer } from './quiz-reducer';

const QuizContext = createContext();

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('QuizContextProvider 범위를 벗어났습니다.');
  }
  return context;
};

export const QuizContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const ctxValue = {
    state,
    dispatch,
    questions: QUESTIONS,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
};
