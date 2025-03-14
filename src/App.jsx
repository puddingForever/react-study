import { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import ResultsTable from './components/ResultsTable';
import { calculateInvestmentResults } from './util/investment';

// inputValue 식별자 상수
export const InputField = {
  INITIAL_INVESTMENT: 'initialInvestment',
  ANNUAL_INVESTMENT: 'annualInvestment',
  EXPECTED_RETURN: 'expectedReturn',
  DURATION: 'duration'
};

// 페이지 구조 및 데이터 관리
const App = () => {
  const [inputValue, setInputValue] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  // input필드 값 변경 시 inputValue 업데이트
  const handleChange = (prop, newValue) => {
    setInputValue(prev => {
      return {
        ...prev,
        [prop]: +newValue
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput inputValue={inputValue} onChange={handleChange} />
      <ResultsTable results={calculateInvestmentResults(inputValue)} initialInv={inputValue.initialInvestment} />
    </>
  );
}

export default App;