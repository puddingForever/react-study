import React from 'react';
import { useQuizContext } from './context/QuizContext';
import Quiz from './components/Quiz/Quiz';
import Summary from './components/Summary/Summary';
import Header from './components/Quiz/Header';

// 게임 상태에 따라 페이지를 다르게 출력
const App = () => {
  const { isGameEnd } = useQuizContext();

  const renderPage = !isGameEnd ? <Quiz /> : <Summary />;

  return (
    <>
      <Header />
      {renderPage}
    </>
  );
}

export default App;