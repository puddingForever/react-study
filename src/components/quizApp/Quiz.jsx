import styles from './quizApp.module.css'
import { QUESTIONS } from '../../constants/constants';
import { useState } from 'react';

// 퀴즈 
const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(QUESTIONS[0])

    return  (
        <div className={styles.quiz}>
            {/* 질문 */}
            <div className={styles.question}>
                <progress/>
                <h2>{currentQuestion.text}</h2>
            </div>
            {/* form 입력 */}
        <form className={styles.answers}>
        {currentQuestion.answers.map((answer,index) => 
            <li className={styles.answer} key={ `${currentQuestion.id}-${index}`}>
                <button>{answer}</button>
            </li>
        )}
        </form>
      </div>
      
    )
}

export default Quiz;