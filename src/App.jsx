import { Header, Quiz } from './components/quizApp';
import { QuizContextProvider } from './components/quizApp/context/quiz-provider';

const App = () => {
  return (
    <>
      <Header />
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </>
  );
};

export default App;
