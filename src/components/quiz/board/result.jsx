import { useQuiz } from '../../../providers/quizProvider';

const Result = () => {
    const { questions, answers, restartQuiz } = useQuiz();

    const correctAnswersCount = questions.reduce(
        (count, question) => (answers[question.id] === question.correctAnswerId ? count + 1 : count),
        0
    );
    const correctRate = Math.round((correctAnswersCount / questions.length) * 100);
    const correctionCount = questions.reduce((count, question) => {
        const userAnswer = answers[question.id];
        const correctAnswer = question.correctAnswerId;
        return userAnswer === correctAnswer ? count + 1 : count;
    }, 0);
    const correctionRate = Math.round((correctionCount / questions.length) * 100);

    return (
        <div id="summary">
            <h2>QUIZ COMPLETED!</h2>

            <div id="summary-stats">
                <p>
                    <span className="number">{correctRate}%</span>
                    <span className="text">정답률</span>
                </p>

                <p>
                    <span className="number">{correctionRate}%</span>
                    <span className="text">수정 성공률</span>
                </p>
            </div>

            <div id="result-answers">
                <ol>
                    {questions.map((question) => {
                        const userAnswer = answers[question.id];
                        const correctAnswer = question.correctAnswerId;
                        const isCorrect = userAnswer === correctAnswer;

                        return (
                            <li key={question.id}>
                                <h3>{questions.indexOf(question) + 1}</h3>
                                <p className="question">{question.text}</p>
                                <p className={`user-answer ${isCorrect ? 'correct' : 'wrong'}`}>
                                    {question.answers.find((a) => a.id === userAnswer)?.text || '답변 없음'}
                                    {!isCorrect && (
                                        <span className="correct-answer">
                                            (정답: {question.answers.find((a) => a.id === correctAnswer)?.text})
                                        </span>
                                    )}
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </div>

            <button onClick={restartQuiz} className="restart-button">
                다시 시작하기
            </button>
        </div>
    );
};

export default Result;
