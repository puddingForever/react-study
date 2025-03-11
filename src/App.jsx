import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import { ListTable } from "./components/ListTable";

function App() {
  const [inputValue, setUserValue] = useState({
    initialInvestment: 10000,
    annualInvestment: 300,
    expectedReturn: 10,
    duration: 12,
  });

  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} setUserValue={setUserValue} />
      <ListTable inputValue={inputValue} />
    </>
  );
}

export default App;
