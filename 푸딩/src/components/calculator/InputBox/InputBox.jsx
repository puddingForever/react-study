import { useState } from 'react';
import { initialInvestmentDetails } from '../../../constants/constants';
import InputWrapper from './InputWrapper';
import ResultTable from '../ResultTable/ResultTable';
import styles from '../calculator.module.css';

const InputBox = () => {
  // --------- useState 변수---------- //
  const [investmentDetails, setInvestmentDetails] = useState(
    initialInvestmentDetails.map((obj) => ({ ...obj }))
  );
  const [calculatedResult, setCalculatedResult] = useState(null);

  //----------------- 유저 데이터 처리함수 -------------------//
  const handleCalculation = (e, id) => {
    const newAmount = Number(e.target.value) || '';

    // 매칭되는 키의 금액 업데이트
    const updatedInvestmentDetails = investmentDetails.map((field) =>
      field.id === id ? { ...field, amount: newAmount } : field
    );
    setInvestmentDetails(updatedInvestmentDetails);

    // 유저 데이터 유무에 따른 조건분리
    // 데이터가 있는 경우 , 투자금 계산용 객체 생성 e.g) {initialInvestment : 200}
    const hasZero = updatedInvestmentDetails.some(
      (field) => field.amount === 0 || field.amount === ''
    );

    setCalculatedResult(
      hasZero
        ? null
        : updatedInvestmentDetails.reduce(
            (accumulator, field) => ({
              ...accumulator,
              [field.id]: field.amount ?? 0,
            }),
            {}
          )
    );
  };

  return (
    <>
      <section id={styles.userInput}>
        {investmentDetails.map((field) => (
          <div key={field.id}>
            <InputWrapper
              amount={field.amount}
              onChange={(e) => handleCalculation(e, field.id)}
              type="number"
              label={field.label}
              name={field.id}
            />
          </div>
        ))}
      </section>
      <ResultTable calculatedResult={calculatedResult} />
    </>
  );
};

export default InputBox;