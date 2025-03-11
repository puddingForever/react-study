import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import ListTable from "./components/ListTable";

function App() {
  const [inputValue, setUserValue] = useState({
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isValidInput = Object.values(inputValue).every((v) => v >= 1);

  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} setUserValue={setUserValue} />
      {!isValidInput && <p className="center">0보다 큰 값을 입력해주세요</p>}
      {isValidInput && <ListTable inputValue={inputValue} />}
    </>
  );
}

export default App;
