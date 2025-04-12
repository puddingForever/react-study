import { useContext } from "react";
import Card from "./Card.jsx";
import { AnswerContext } from "../context/answerContext.jsx";

export default function Quiz() {
  const { activeIndex } = useContext(AnswerContext);
  //현재 활성화된 질문을 관리하고 다른 질문으로 변경
  //답변이 선택될 때마다 재랜더링

  //자식 컴포넌트가 받는 props가 "새 객체/새 함수"면 부모, 자식 다시 리랜더링
  //useCallback 통해 같은 함수 참조 유지

  return (
    <div id="quiz">
      <Card key={activeIndex} />
    </div>
  );
}
