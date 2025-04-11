import styles from '../quizApp.module.css';
import Result from '../Result/Result';
import { useQuizContext } from '../context/quiz-provider';
import { useProgressBarTimer } from '../hooks/useProgressBarTimer';
import { useQuizState } from '../hooks/useQuizState';
import { useAnsweredHandler } from '../hooks/useAnswerHandler';

const Quiz = () => {
  const { state, dispatch, questions } = useQuizContext();
  const {
    currentQuestionIndex,
    currentProgress,
    selectedAnswer,
    score,
    isAnswered,
  } = state;
  // hooks
  const { fasterProgress } = useProgressBarTimer();
  const { currentQuestion } = useQuizState();

  // 답선택
  const handleAnswer = (e) => {
    const userAnswer = e.target.value;
    const correctAnswer = questions[currentQuestionIndex];

    // 유저답으로 업데이트
    dispatch({ type: 'SELECT_ANSWER', payload: userAnswer });
    // 정답이면 , 프로그래스바 빠르게
    if (selectedAnswer === correctAnswer) {
      alert('?');
      // fasterProgress();
    }
  };

  return (
    <div className={styles.quiz}>
      {/* 프로그래스바 & 질문 */}
      <div className={styles.question}>
        <progress value={currentProgress} max="100" />
        <h2>{currentQuestion.text}</h2>
      </div>
      {/* 퀴즈리스트  */}
      <div className={styles.answers}>
        {currentQuestion.answers.map((answer, index) => (
          <div className={styles.answer} key={`${currentQuestion.id}-${index}`}>
            <button onClick={(e) => handleAnswer(e)} value={answer}>
              {answer}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
