import { useState } from 'react';
import { calculateInvestmentResults, formatter } from '../util/investment';

// inputValue 식별자 상수
export const InputField = {
  INITIAL_INVESTMENT: 'initialInvestment',
  ANNUAL_INVESTMENT: 'annualInvestment',
  EXPECTED_RETURN: 'expectedReturn',
  DURATION: 'duration'
};

// 입력과 결과 출력을 하나의 컴포넌트로 통합
const InvestmentCalculator = () => {
  const [inputValue, setInputValue] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const inputIsValid = inputValue.duration >= 1;

  // input필드 값 변경 시 inputValue 업데이트
  const handleChange = (prop, newValue) => {
    setInputValue(prev => {
      return {
        ...prev,
        [prop]: +newValue
      };
    });
  }

  // 유효한 입력값에 대해서만 결과 계산
  const results = inputIsValid ? calculateInvestmentResults(inputValue) : [];

  return (
    <>
      {/* 사용자 입력 부분 */}
      <section id="user-input">
        <div className="input-group">
          <p>
            <label>Initial Investment</label>
            <input
              type="number"
              value={inputValue.initialInvestment}
              onChange={event => handleChange(InputField.INITIAL_INVESTMENT, event.target.value)}
            />
          </p>
          <p>
            <label>Annual Investment</label>
            <input
              type="number"
              value={inputValue.annualInvestment}
              onChange={event => handleChange(InputField.ANNUAL_INVESTMENT, event.target.value)}
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label>Expected Return</label>
            <input
              type="number"
              value={inputValue.expectedReturn}
              onChange={event => handleChange(InputField.EXPECTED_RETURN, event.target.value)}
            />
          </p>
          <p>
            <label>Duration</label>
            <input
              type="number"
              value={inputValue.duration}
              onChange={event => handleChange(InputField.DURATION, event.target.value)}
            />
          </p>
        </div>
      </section>

      {/* 결과 출력 부분 */}
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}

      {inputIsValid && (
        <table id="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {results.map(yearData => {
              const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - inputValue.initialInvestment;
              const totalAmountInvested = yearData.annualInvestment * yearData.year + inputValue.initialInvestment;

              return (
                <tr key={yearData.year}>
                  <td>{yearData.year}</td>
                  <td>{formatter.format(yearData.valueEndOfYear)}</td>
                  <td>{formatter.format(yearData.interest)}</td>
                  <td>{formatter.format(totalInterest)}</td>
                  <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default InvestmentCalculator;