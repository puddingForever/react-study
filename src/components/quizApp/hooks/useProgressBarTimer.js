import { useEffect, useRef } from "react";
import { useQuizContext } from "../context/quiz-provider";

// 프로그래스바 컨트롤
export const useProgressBarTimer = () => {
  // context
  const { state, dispatch, questions } = useQuizContext();
  const { currentProgress, currentQuestionIndex, selectedAnswer } = state;

  //  fast 모드 조작용 useRef
  const intervalRef = useRef(null);
  const isFastMode = useRef(null);

  // 퀴즈가 변경될때 , Fast모드 해제
  useEffect(() => {
    isFastMode.current = false;
  }, [currentQuestionIndex]);

  // 프로그래스바 업데이트
  useEffect(() => {
    intervalRef.current = setInterval(
      () => {
        dispatch({
          type: "UPDATE_PROGRESS",
          payload: currentProgress - 20,
        });

        // 프로그래스바 끝나면 다음퀴즈가기
        if (currentProgress <= 0) {
          // 타이머내에 퀴즈를 클릭하지 않았을 떄 강제 추가
          if (!selectedAnswer) {
            dispatch({
              type: "STORE_ANSWER",
              payload: {
                userAnswer: "",
                questionText: questions[currentQuestionIndex].text,
                isCorrect: false,
                isSkipped: true,
              },
            });
          }

          dispatch({ type: "NEXT_QUIZ" });
        }

        // 정답을 맞춘 경우, 진행 빠르게
      },
      isFastMode.current ? 200 : 1000
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    dispatch,
    currentProgress,
    isFastMode.current,
    selectedAnswer,
    questions,
    currentQuestionIndex,
  ]);

  // 프로그래스바 진행 빠르게
  const fasterProgress = () => {
    isFastMode.current = true;
  };

  return { fasterProgress };
};
