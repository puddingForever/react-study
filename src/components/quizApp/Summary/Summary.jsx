import styles from '../quizApp.module.css'
import Logo from '../../../assets/quiz-complete.png';
import { useQuizContext } from '../context/quiz-provider';


// 결과 
const Summary = () => {

  const { state , questions}= useQuizContext();
  const {answers } = state; // 퀴즈 최종 결과오브젝트 배열 

  // 최종점수 백분율 계산 
  const totalQuiz = questions.length;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length; // 정답
  const wrongAnswers = answers.filter(answer => !answer.isSkipped && !answer.isCorrect).length; // 오답 
  const skippedAnswers =  answers.filter(answer => answer.isSkipped).length; // 스킵한 질문  
  // 백분율
  const correctPercentage = ((correctAnswers / totalQuiz ) * 100).toFixed(0);
  const wrongPercentage = ((wrongAnswers / totalQuiz) * 100).toFixed(0);
  const skippedPercentage = ((skippedAnswers / totalQuiz) * 100).toFixed(0); 

  return <div className={styles.summary}>
            <img src={Logo} alt="summary logo" />
            <h2>QUIZ COMPLETED!</h2>
            {/* 결과 백분율 */}
            <div className={styles.summaryStats}>
              <div>
                <div className={styles.number}>{skippedPercentage}%</div>
                <div className={styles.text}>skipped</div>
              </div>
              <div>
                <div className={styles.number}>{correctPercentage}%</div>
                <div className={styles.text}>answered correctly</div>
              </div>
              <div>
                <div className={styles.number}>{wrongPercentage}%</div>
                <div className={styles.text}>answered incorrectly</div>
              </div>
            </div>
            <ol>
              {/* 답변한 질문과 결과 */}
              {answers.map((answer,idx) => {
                  return (
                    <li key={`${answer.userAnswer}-${idx}`}>
                        <h3>{idx + 1}</h3>
                        <div className={styles.question}>{answer.questionText}</div>
                        <div className={styles.userAnswer}>
                          { answer.isSkipped ? <p>skipped</p>
                           : ( <p className={`${answer.isCorrect ? styles.correct : styles.wrong} `}>{answer.userAnswer}</p> )
                          }
                        </div>
                    </li> 
                  )
                })
              }
            </ol>
          </div>;
};

export default Summary;
