import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";

function App() {
  const [inputValue, setUserValue] = useState({
    initialInvestment: 10000,
    annualInveatment: 300,
    expectedReturn: 5.5,
    duration: 12,
  });

  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} setUserValue={setUserValue} />
    </>
  );
}

export default App;
