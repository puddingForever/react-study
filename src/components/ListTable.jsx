import { calculateInvestmentResults, formatter } from "../util/investment";
const THEAD_NAMES = [
  "연도\nYear",
  "투자 가치\nInvestment Value",
  "연간 이자\nInterest(Year)",
  "총 이자 수익\nTotal Interest",
  "투자 원금\nInvested Capital",
];

export default function ListTable({ inputValue }) {
  const results = calculateInvestmentResults(inputValue);
  const { valueEndOfYear, interest, annualInvestment } = results[0];
  const initialInvestment = valueEndOfYear - interest - annualInvestment;
  console.log(results);
  return (
    <>
      <table id="result">
        <thead>
          <tr>
            {THEAD_NAMES.map((name) => (
              <td key={name}>{name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            //연도, 연간 이자, 연말 총 투자가치, 연간 투자 금액
            const { year, interest, valueEndOfYear, annualInvestment } = result;
            const totalInterest = valueEndOfYear - annualInvestment * year - initialInvestment;
            const totalAmountInvested = valueEndOfYear - totalInterest;
            return (
              <tr key={year} className="center">
                {/* 연도 */}
                <td>{year}</td>
                {/* 투자 가치 */}
                <td>{formatter.format(valueEndOfYear)}</td>
                {/* 연간 이자 */}
                <td>{formatter.format(interest)}</td>
                {/* 총 이자 */}
                <td>{formatter.format(totalInterest)}</td>
                {/* 투자 원금 */}
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
