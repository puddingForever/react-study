import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { questions } from '../data/questions';
import { TIMER_STATE, QUESTION_TIMER, ANSWER_TIMER, CHECKING_TIMER, ANSWER_STATE } from '../data/constants';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isGameEnd, setIsGameEnd] = useState(false);

  // 타이머 관련 상태
  const [timerState, setTimerState] = useState(TIMER_STATE.RUNNING);
  const [timerProgress, setTimerProgress] = useState(100);
  const timerRef = useRef(null);
  const stateTimeoutRef = useRef(null);

  // 타이머 상태 변경 감지하여 자동 전환
  useEffect(() => {
    // 이미 진행 중인 타이머 정리
    clearTimeout(stateTimeoutRef.current);

    if (isGameEnd) return;

    // 타이머 상태에 따라 자동 전환
    if (timerState === TIMER_STATE.ANSWERED) {
      // ANSWERED 상태에서 CHECKING으로 자동 전환
      stateTimeoutRef.current = setTimeout(() => {
        setTimerState(TIMER_STATE.CHECKING);
      }, ANSWER_TIMER);
    } else if (timerState === TIMER_STATE.CHECKING) {
      // CHECKING 상태에서 다음 문제로 자동 전환
      stateTimeoutRef.current = setTimeout(() => {
        goToNextQuestion();
      }, CHECKING_TIMER);
    }

    return () => {
      clearTimeout(stateTimeoutRef.current);
    };
  }, [timerState, isGameEnd]);

  // 메인 타이머 로직
  useEffect(() => {
    if (isGameEnd) return;

    const duration =
      timerState === TIMER_STATE.ANSWERED ? ANSWER_TIMER :
        timerState === TIMER_STATE.CHECKING ? CHECKING_TIMER :
          QUESTION_TIMER;

    // 타이머 초기화
    clearInterval(timerRef.current);
    setTimerProgress(100);

    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const diff = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (diff / duration) * 100);

      setTimerProgress(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        // 문제를 안풀고 시간이 다 되면 자동으로 skip
        if (timerState === TIMER_STATE.RUNNING) 
          skipQuestion();
      }
    }, 16);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, timerState, isGameEnd]);

  // 다음 문제로 이동
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimerState(TIMER_STATE.RUNNING);
    } else {
      // 문제를 다 풀면 퀴즈 완료
      const finalAnswers = [...userAnswers];

      // 남은 null 상태의 문제들을 'skipped'로 처리
      finalAnswers.forEach((answer, index) => {
        if (answer === null) {
          finalAnswers[index] = ANSWER_STATE.SKIPPED;
        }
      });

      setUserAnswers(finalAnswers);
      setIsGameEnd(true);
    }
  };

  // 답 선택시
  const handleAnswer = (answerIndex) => {
    // 선택한 답 저장
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    // 타이머 상태 변경 (답변 선택 후 노란색으로 표시)
    setTimerState(TIMER_STATE.ANSWERED);
  };

  // 시간초과로 skip - 타이머 상태 변경 없이 바로 다음문제
  const skipQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = ANSWER_STATE.SKIPPED;
    setUserAnswers(newAnswers);

    goToNextQuestion();
  };

  //퀴즈 통계 계산
  const calculateStats = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    // 퀴즈가 완료되었을 때만 전체 통계 계산
    // 현재까지 풀어본 문제만 계산
    if (isGameEnd) {
      userAnswers.forEach((answer, index) => {
        if (answer === ANSWER_STATE.SKIPPED) {
          skipped++;
        } else if (answer === questions[index].correctAnswer) {
          correct++;
        } else if (answer !== null) {
          wrong++;
        } else {
          // 답변하지 않은 문제도 skip으로 처리
          skipped++;
        }
      });
    }

    return { correct, wrong, skipped, total: questions.length };
  };

  const value = {
    questions,
    currentQuestionIndex,
    userAnswers,
    isGameEnd,
    timerState,
    timerProgress,
    handleAnswer,
    calculateStats
  };

  return <QuizContext value={value}>{children}</QuizContext>;
};
