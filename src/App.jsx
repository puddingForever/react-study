
import Result from "./components/Result.jsx";
import Input from "./components/Input.jsx";
import {useState} from "react";


// 초기 투자값 등 기본 값을 설정
const INPUT = {
    initialInvestment: 10000, // 초기 투자금
    annualInvestment: 1200, // 연간 투자금
    expectedReturn: 6, // 예상 수익률 (%)
    duration: 10 // 투자 기간 (년)
};
function App() {
    const [inputs, setInputs] = useState(INPUT); // 상태 초기화: INPUT 객체


    // 사용자가 입력값을 변경할 때마다 호출되는 함수
    function handleInputValueChange(input, newValue) {
        setInputs(prevInputs => {
            return {
                // 기존 값은 그대로 유지하고, 변경된 input 값만 업데이트
                ...prevInputs,
                [input]: +newValue // `+` 연산자를 이용해 문자열을 숫자로 변환
            };
        });
    }
    return (
        <main>
            <div id="user-input">
                <div className="input-group">
                    {/* 각 Input 컴포넌트에 값과 변경된 값을 처리할 함수 전달 */}
                    <Input
                        label="INITIAL INVESTMENT"
                        input="initialInvestment"
                        initialValue={INPUT.initialInvestment}
                        onChangeValue={handleInputValueChange}
                    />
                    <Input
                        label="ANNUAL INVESTMENT"
                        input="annualInvestment"
                        initialValue={INPUT.annualInvestment}
                        onChangeValue={handleInputValueChange}
                    />
                </div>
                <div className="input-group">
                    <Input
                        label="EXPECTED RETURN"
                        input="expectedReturn"
                        initialValue={INPUT.expectedReturn}
                        onChangeValue={handleInputValueChange}
                    />
                    <Input
                        label="DURATION"
                        input="duration"
                        initialValue={INPUT.duration}
                        onChangeValue={handleInputValueChange}
                    />
                </div>
            </div>
            {/* 입력된 값들을 Result 컴포넌트에 전달 */}
            <Result input={inputs} />
        </main>
    );
}

export default App;