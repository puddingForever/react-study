import { createContext, useReducer } from "react";

// 1.  Context 생성: 사용자 답안을 저장하고 업데이트할 수 있도록 Context 생성
export const UserAnswerContext = createContext({
  userAnswer: [], // 사용자 답안 상태 (문제, 선택한 답, 결과)를 배열로 저장
  // 예시: [{ id: 1, question: "문제", selectedAnswer: "답", result: "skip" }]
  addUserAnswer: () => {}, // 사용자 답안을 추가하는 함수 (디폴트로 빈 함수)
});

// 2. 상태 업데이트를 위한 Reducer 정의
// 사용자가 답안을 추가할 때마다 호출되는 리듀서
function userAnswerReducer(state, action) {
  // 만약 액션 타입이 "ADD_USER_ANSWER"라면, 사용자 답안을 배열에 추가
  switch (action.type) {
    case "ADD_USER_ANSWER":
      return [...state, action.payload]; // 기존 상태를 복사하고 새 답안을 추가
    default:
      return state;
  }
}

// 3. Context를 제공하는 Provider 컴포넌트
export default function UserAnswerContextProvider({ children }) {
  // useReducer 훅을 사용하여 상태(userAnswerState)와 상태 업데이트 함수(userAnswerDispatch)를 관리
  const [userAnswerState, userAnswerDispatch] = useReducer(
    userAnswerReducer,
    [],
  );

  // 사용자 답안을 추가하는 함수 정의
  function addAnswer(answer) {
    // 사용자가 선택한 답안을 추가하는 액션을 디스패치
    userAnswerDispatch({ type: "ADD_USER_ANSWER", payload: answer });
  }

  // Context 값 (상태와 함수)을 객체로 묶어서 제공
  const ctxValue = {
    userAnswer: userAnswerState, // 현재 상태
    addUserAnswer: addAnswer, // 답안 추가 함수
  };

  // 자식 컴포넌트에 Context 값을 제공하는 Provider 반환
  return (
    <UserAnswerContext.Provider value={ctxValue}>
      {children} {/* children: Context를 사용할 자식 컴포넌트들 */}
    </UserAnswerContext.Provider>
  );
}
