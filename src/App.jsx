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

  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} setUserValue={setUserValue} />
      <ListTable inputValue={inputValue} />
    </>
  );
}

export default App;
