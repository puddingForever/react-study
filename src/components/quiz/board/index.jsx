import { useQuiz } from '../../../providers/quizProvider';
import Question from './question';
import Result from './result';

const Board = () => {
    const { isCompleted } = useQuiz();
    return <div id="">{isCompleted ? <Result /> : <Question />}</div>;
};

export default Board;
