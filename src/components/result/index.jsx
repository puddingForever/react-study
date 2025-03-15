import { calculateInvestmentResults, formatter } from '../../util/investment';

const Result = ({ investments }) => {
    const resultDataList = calculateInvestmentResults({
        initialInvestment: investments.initialInvestment.value,
        annualInvestment: investments.annualInvestment.value,
        expectedReturn: investments.expectedReturn.value,
        duration: investments.duration.value,
    });
    let totalValue = 0;

    return (
        <div id="result">
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Investment Value</th>
                        <th>interst(Year)</th>
                        <th>Total interest</th>
                        <th>Invested Copital</th>
                    </tr>
                </thead>
                <tbody>
                    {resultDataList.map((resultData) => (
                        <tr key={resultData.year}>
                            <td>{resultData.year}</td>
                            <td>{formatter.format(resultData.valueEndOfYear)}</td>
                            <td>{formatter.format(resultData.interest)}</td>
                            <td>{formatter.format((totalValue += resultData.interest))}</td>
                            <td>{formatter.format(resultData.valueEndOfYear - totalValue)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Result;
