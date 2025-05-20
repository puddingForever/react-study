import { useEffect, useState } from "react";

export default function Timer({ timeout, onTimeout }) {
  //남은 시간
  const [remainingTime, setRemainingTime] = useState(timeout);

  //timeout 의 시간이 지나면 onTimeout 함수를 실행
  //다음 문제로 넘기기
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      //10ms마다 remainingTime을 10ms씩 줄여서 남은 시간 관리
      setRemainingTime((prev) => prev - 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
