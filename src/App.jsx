import React from 'react';
import { useQuizContext } from './context/QuizContext';
import QuizPage from './components/Quiz/QuizPage';
import SummaryPage from './components/Summary/SummaryPage';
import Header from './components/Header';

// 게임 상태에 따라 페이지를 다르게 출력
const App = () => {
  const { isGameEnd } = useQuizContext();

  const renderPage = !isGameEnd ? <QuizPage /> : <SummaryPage />;

  return (
    <>
      <Header />
      {renderPage}
    </>
  );
}

export default App;