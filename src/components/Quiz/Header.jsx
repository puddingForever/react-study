import React from 'react';
import quizLogo from '../../assets/quiz-logo.png';
/**
 * 헤더 출력
 */
const Header = () => {
  return (
    <header>
      <img src={quizLogo} alt="React Quiz Logo" />
      <h1>React Quiz</h1>
    </header>
  );
};

export default Header;