import { useState, useEffect, useRef } from 'react';
import { useQuiz } from '../../../providers/quizProvider';

const Timer = ({ duration = 4, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(duration);
    const { currentQuestion, countQuestionFail, currentAnswerState, answerQuestion, goToNextQuestion } = useQuiz();
    const timerRef = useRef(null);
    const currentDuration = duration / (countQuestionFail + 1);
    const startTimer = () => {
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 0.1) {
                    clearInterval(timerRef.current);
                    onTimeout && onTimeout();
                    return 0;
                }
                return prevTime - 0.1;
            });
        }, 100);
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        if (countQuestionFail > 4) {
            goToNextQuestion();
        }
        setRemainingTime(currentDuration);
        startTimer();
    }, [currentQuestion, countQuestionFail, currentAnswerState, duration]);

    return (
        <div>
            <progress value={remainingTime} max={currentDuration} />
        </div>
    );
};

export default Timer;
