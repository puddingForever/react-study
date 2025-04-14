import React, { useCallback, useContext, useEffect, useState } from "react";
import Question from "./Question.jsx";
import Answers from "./Answers.jsx";
import { UserAnswerContext } from "../store/user-answer-context.jsx";

function Quiz({ quizs, onQuizEnd }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizStage, setQuizStage] = useState("quiz"); // "quiz" or "showSelectedAnswer" or "showCorrectAnswer"
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { addUserAnswer } = useContext(UserAnswerContext);

  const quiz = quizs[currentQuizIndex];
  const time = (quizStage === "quiz" ? 10 : 0.5) * 1000;

  useEffect(() => {
    // quizStage가 "quiz"일 때는 10초, "showSelectedAnswer"이거나"showCorrectAnswer"일 때는 1초
    const timer = setTimeout(() => {
      if (quizStage === "quiz") {
        setQuizStage("showCorrectAnswer");
      } else if (quizStage === "showSelectedAnswer") {
        setQuizStage("showCorrectAnswer");
      } else if (quizStage === "showCorrectAnswer") {
        handleNextQuestion();
      }
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuizIndex, quizStage, selectedAnswer]);

  function handleNextQuestion() {
    if (currentQuizIndex >= quizs.length - 1) {
      onQuizEnd("summary");
      return;
    }

    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    setQuizStage("quiz");
  }
  function handleSkipClick() {
    setQuizStage("showCorrectAnswer");
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: "",
      result: "skipped",
    });
  }
  function handleAnswerSelect(answer) {
    setSelectedAnswer(answer);
    setQuizStage("showSelectedAnswer");
    addUserAnswer({
      id: quiz.id,
      question: quiz.text,
      selectedAnswer: answer,
      result: answer === quiz.correctAnswer ? "correct" : "wrong",
    });
  }

  return (
    <section id="quiz">
      <Question
        key={`${currentQuizIndex}-${quizStage}`}
        question={quiz.text}
        time={time}
        isAnswered={quizStage !== "quiz"}
      />
      <Answers
        answers={quiz.answers}
        selectedAnswer={selectedAnswer}
        correctAnswer={quiz.correctAnswer}
        onAnswerSelect={handleAnswerSelect}
        quizStage={quizStage}
      />
      <div id="skip-action">
        {quizStage === "quiz" && (
          <button type="button" onClick={handleSkipClick}>
            Skip
          </button>
        )}
      </div>
    </section>
  );
}

export default Quiz;
