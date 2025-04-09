// 타이머 상수 (밀리초 단위)
export const QUESTION_TIMER = 5000; // 문제 풀이 시간 (5초)
export const ANSWER_TIMER = 1000;   // 답 선택 후 대기 시간 (1초)
export const CHECKING_TIMER = 1000; // 정답 확인 후 대기 시간 (1초)

export const TIMER_STATE = {
  RUNNING: 'running',      // 기본 타이머 실행
  ANSWERED: 'answered',    // 답 선택 후 타이머
  CHECKING: 'checking'     // 정답 확인 후 타이머
};

export const ANSWER_STATE = {
  CORRECT: 'correct',      // 정답
  WRONG: 'wrong',          // 오답
  SKIPPED: 'skipped',      // 스킵
  SELECTED: 'selected'     // 선택됨
}