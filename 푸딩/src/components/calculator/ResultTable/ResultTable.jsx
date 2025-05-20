import {
    calculateInvestmentResults,
    formatter,
  } from '../../../util/investment';
  import styles from '../calculator.module.css';
  
  const ResultTable = ({ calculatedResult }) => {
    let results = '';
  
    //-------- 계산된 투자금 유무에따른 조건랜더링 --------//
    if (!calculatedResult) {
      results = (
        <tr>
          <td colSpan="5" className={styles.center}>
            <h1>값을 모두 입력해주세요</h1>
          </td>
        </tr>
      );
    } else {
      // 투자결과 계산
      const resultData = calculateInvestmentResults(calculatedResult);
      const initialInvestment =
        resultData[0].valueEndOfYear -
        resultData[0].interest -
        resultData[0].annualInvestment;
  
      results = (
        <>
          {resultData.map(
            ({ year, interest, valueEndOfYear, annualInvestment }) => {
              // total interest, invested capita 계산
              const totalInterest =
                valueEndOfYear - annualInvestment * year - initialInvestment;
              const investedCapital = valueEndOfYear - totalInterest;
  
              // 금액 포멧
              const formattedValueEndOfYear = formatter.format(valueEndOfYear);
              const formattedInterest = formatter.format(interest);
              const formattedTotalInterest = formatter.format(totalInterest);
              const formattedInvestedCapital = formatter.format(investedCapital);
  
              return (
                <tr key={year} className={styles.center}>
                  <td>{year}</td>
                  <td>{formattedValueEndOfYear}</td>
                  <td>{formattedInterest}</td>
                  <td>{formattedTotalInterest}</td>
                  <td>{formattedInvestedCapital}</td>
                </tr>
              );
            }
          )}
        </>
      );
    }
  
    return (
      <section id={styles.result}>
        <table>
          <thead>
            <tr className={styles.center}>
              <td>Year</td>
              <td>Investment Value</td>
              <td>Interest(Year)</td>
              <td>Total Interest</td>
              <td>Invested Capital</td>
            </tr>
          </thead>
          <tbody>{results}</tbody>
        </table>
      </section>
    );
  };
  
  export default ResultTable;