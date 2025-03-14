import { InputField } from '../App';

// 값을 입력받아 inputValue 업데이트
const UserInput = ({ inputValue, onChange }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            value={inputValue.initialInvestment}
            onChange={event => onChange(InputField.INITIAL_INVESTMENT, event.target.value)}
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            value={inputValue.annualInvestment}
            onChange={event => onChange(InputField.ANNUAL_INVESTMENT, event.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            value={inputValue.expectedReturn}
            onChange={event => onChange(InputField.EXPECTED_RETURN, event.target.value)}
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            value={inputValue.duration}
            onChange={event => onChange(InputField.DURATION, event.target.value)}
          />
        </p>
      </div>
    </section>
  );
}

export default UserInput;