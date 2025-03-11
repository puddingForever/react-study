import { calculateInvestmentResults, formatter } from "../util/investment";

export function ListTable({ inputValue }) {
  const result = calculateInvestmentResults(inputValue);
  console.log(result);
  //Year, Investment Value, Interest(Year), Total Interest, Invested Capital
  return (
    <>
      <table id="table"></table>
    </>
  );
}
