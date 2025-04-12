import styles from '../quizApp.module.css';
import { useQuizContext } from '../context/quiz-provider';
import { useProgressBarTimer } from '../hooks/useProgressBarTimer';
import { useQuizState } from '../hooks/useQuizState';
import Summary from '../Summary/Summary';

const Quiz = () => {
  // context 
  const { state, dispatch } = useQuizContext();
  const {
    currentProgress,
    selectedAnswer, 
  } = state;

  // hooks
  const { fasterProgress } = useProgressBarTimer();
  const { currentQuestion , isComplete } = useQuizState(); // 현재 퀴즈추적 hook

  // 답선택
  const handleAnswer = (e) => {

    //이미 선택한 답이 있다면 반응안되도록 
    if(selectedAnswer) return;

    const userAnswer = e.target.value;
    const correctAnswer = currentQuestion.answers[0];

    // 질문과 사용자 답변내역을 배열에 추가 
    dispatch({type : 'STORE_ANSWER', payload : { userAnswer,
                                                 questionText : currentQuestion.text,
                                                 isCorrect : userAnswer === correctAnswer,
                                                 isSkipped : false }})

    // 현재 선택한 답변 
    dispatch({ type: 'SELECT_ANSWER', payload: userAnswer });

    // 정답
    if (userAnswer=== correctAnswer) {
      fasterProgress();
    }
  };

   // 퀴즈가 끝남 
  if(isComplete){
    return <><Summary /></>
  }

  return (
    <div className={styles.quiz}>
      {/* 프로그래스바 & 질문 */}
      <div className={styles.question}>
        <progress value={currentProgress} max="100" />
        <h2>{currentQuestion.text}</h2>
      </div>

      {/* 퀴즈리스트  */}
      <div className={styles.answers}>
        {currentQuestion.answers.map((answer, index) => {
          // 클릭한 답이 정답 
          const isCorrectAnswer = selectedAnswer === answer && answer === currentQuestion.answers[0];

          return ( 
              <div className={ isCorrectAnswer ? styles.skipAction : styles.answer} key={`${currentQuestion.id}-${index}`} >
                <button onClick={(e) => handleAnswer(e)} value={answer}>
                  {answer}
                </button>
              </div> 
            )
        })}
      </div>
    </div>
  );
};

export default Quiz;
