import React from "react";
import quizLogoImg from "./../assets/quiz-logo.png";
function Header() {
  return (
    <header>
      <img src={quizLogoImg} alt="Quiz Logo Image" />
      <h1>REACTQUIZ</h1>
    </header>
  );
}

export default Header;
