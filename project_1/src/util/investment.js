// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount 초기 투자 금액
// - annualInvestment: The amount invested every year 매년 투자 금액
// - expectedReturn: The expected (annual) rate of return 예상 연간 수익률
// - duration: The investment duration (time frame) 투자기간
export function calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration }) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1, // year identifier
      interest: interestEarnedInYear, // the amount of interest earned in this year
      valueEndOfYear: investmentValue, // investment value at end of year
      annualInvestment: annualInvestment, // investment added in this year
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
