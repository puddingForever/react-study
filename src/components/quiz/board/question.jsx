import { useQuiz } from '../../../providers/quizProvider';
import Timer from './timer';
import { useState } from 'react';

const Question = () => {
    const { currentQuestion, currentAnswerState, answerQuestion } = useQuiz();
    let selected = null;

    const handleAnswer = () => {
        // console.log('handleAnswer: ', selected);
        answerQuestion(currentQuestion.id, selected);

        const buttons = document.querySelectorAll('.answer button');
        buttons.forEach((button) => {
            button.blur();
        });
    };

    return (
        <div id="question">
            <Timer onTimeout={() => handleAnswer()} />
            <h2>{currentQuestion.text}</h2>
            <div id="answers">
                {currentQuestion.answers.map((answer) => (
                    <div className="answer" key={answer.id}>
                        <button onClick={() => (selected = answer.id)}>{answer.text}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Question;
