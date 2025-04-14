
function Answers({
  answers,
  selectedAnswer,
  correctAnswer,
  onAnswerSelect,
  quizStage,
}) {
  function handleAnswerSelect(answer) {
    onAnswerSelect(answer);
  }

  return (
    <section id="answers">
      {answers.map((answer) => {
        let className = "";

        if (quizStage === "showSelectedAnswer") {
          className = answer === selectedAnswer ? "selected" : "";
        } else if (quizStage === "showCorrectAnswer") {
          if (answer === selectedAnswer) {
            className = "wrong";
          }
          if (answer === correctAnswer) {
            className = "correct";
          }
        }

        return (
          <p key={answer} className="answer">
            <button
              className={className}
              disabled={quizStage !== "quiz"}
              type="button"
              onClick={() => handleAnswerSelect(answer)}
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
