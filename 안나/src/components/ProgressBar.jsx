import React, { useEffect, useState } from "react";

// 퀴즈 제한 시간에 따라 남은 시간을 보여주는 진행 바 컴포넌트
function ProgressBar({ time, isAnswered }) {
  // 남은 시간(ms 단위)를 상태로 관리
  const [remainingTimer, setRemainingTimer] = useState(time);

  useEffect(() => {
    // 새 문제 또는 상태가 변경되면 타이머를 초기화
    setRemainingTimer(time);

    const interval = setInterval(() => {
      setRemainingTimer((prevTime) => prevTime - 10);
    }, 10);

    // useEffect cleanup: 컴포넌트 언마운트 시 또는 time이 바뀔 때 인터벌 제거
    return () => {
      clearInterval(interval);
    }; // Cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행되어 인터벌 타이머를 정리
  }, [time]); // `time`이 바뀔 때마다 이 effect가 재실행됨

  return (
    <progress
      className={isAnswered ? "answered" : ""} // 정답 선택 상태에 따라 조건부 클래스 적용
      value={remainingTimer} // 현재 남은 시간
      max={time} // 최대 시간
    />
  );
}

export default ProgressBar;
