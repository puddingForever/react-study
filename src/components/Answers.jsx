import { STAGES } from "../constants/stages.js";

// 답변 목록을 보여주는 컴포넌트
// props:
// - answers: 퀴즈의 선택지 목록
// - selectedAnswer: 사용자가 고른 선택지
// - correctAnswer: 퀴즈의 정답 선택지
// - onAnswerSelect: 사용자가 답변 제출시 호출되는 함수
// - quizStage: 퀴즈의 현재 상태 ( STAGES.QUIZ |  STAGES.SELECTED |  STAGES.CORRECT)
function Answers({
  answers,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
  quizStage,
}) {
  // 사용자가 답변을 선택했을 때 호출
  function handleAnswerSelect(answer) {
    onAnswerSelect(answer); // 부모 컴포넌트로 선택된 답안을 전달
  }

  function getClassName(answer) {
    // 사용자가 답을 선택한 단계라면
    if (quizStage === STAGES.SELECTED) {
      // 선택한 선택지 "selected" 클래스 추가
      return answer === selectedAnswer ? "selected" : "";
    }

    // 정답을 보여주는 단계라면
    if (quizStage === STAGES.CORRECT) {
      // 정답인 보기에 "correct" 클래스 추가
      if (answer === correctAnswer) return "correct";

      // 사용자가 선택한 답이 정답이 아닐 경우 "wrong" 클래스 추가
      if (answer === selectedAnswer && selectedAnswer !== correctAnswer)
        return "wrong";
    }

    return "";
  }

  return (
    <section id="answers">
      {/* 보기 목록을 렌더링 */}
      {answers.map((answer) => {
        return (
          <p key={answer} className="answer">
            <button
              className={getClassName(answer)} // 위 조건에 따라 동적으로 스타일 클래스 지정
              disabled={quizStage !== STAGES.QUIZ} // 퀴즈 푸는 중에만 클릭 가능
              type="button"
              onClick={() => handleAnswerSelect(answer)} // 보기 선택 핸들러 호출
            >
              {answer}
            </button>
          </p>
        );
      })}
    </section>
  );
}

export default Answers;
