import { createContext, useReducer } from "react";

export const UserAnswerContext = createContext({
  userAnswer: [], // 문제, 선택한 답, 결과(skip, correct, wrong)를 값으로 하는 객체를 배열로 저장
  // [{ id: 1, question: "문제", selectedAnswer: "답", result: "skip" }]
  addUserAnswer: () => {},
});

function userAnswerReducer(state, action) {
  if (action.type === "ADD_USER_ANSWER") {
    const updatedUserAnswer = [...state, action.payload];
    // const updatedUserAnswer = [...state.userAnswer, action.payload];
    return updatedUserAnswer;
  }
  return state;
}

export default function UserAnswerContextProvider({ children }) {
  const [userAnswerState, userAnswerDispatch] = useReducer(
    userAnswerReducer,
    [],
  );

  function handleAddUserAnswer(answer) {
    userAnswerDispatch({ type: "ADD_USER_ANSWER", payload: answer });
  }

  const ctxValue = {
    userAnswer: userAnswerState,
    addUserAnswer: handleAddUserAnswer,
  };

  return (
    <UserAnswerContext.Provider value={ctxValue}>
      {children}
    </UserAnswerContext.Provider>
  );
}
