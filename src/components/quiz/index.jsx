import Board from './board';
import { QuizProvider } from '../../providers/quizProvider';

const Quiz = () => {
    return (
        <div id="quiz">
            <QuizProvider>
                <Board />
            </QuizProvider>
        </div>
    );
};
export default Quiz;
