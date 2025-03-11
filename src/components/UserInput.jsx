export default function UserInput({ label, inputValue, setUserValue, ...props }) {
  const names = Object.keys(inputValue);
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setUserValue((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <article id="user-input">
      <div className="input-group">
        <div>
          <label htmlFor={names[0]}>
            초기 투자 금액
            <br />
            INITIAL INVESTMENT
          </label>
          <input
            type="number"
            name={names[0]}
            value={inputValue[names[0]]}
            onChange={handleGetValue}
            required
            {...props}
          />
        </div>
        <div>
          <label htmlFor={names[1]}>
            매년 투자 금액
            <br />
            ANNUAL INVESTMENT
          </label>
          <input
            type="number"
            name={names[1]}
            value={inputValue[names[1]]}
            onChange={handleGetValue}
            required
            {...props}
          />
        </div>
      </div>
      <div className="input-group">
        <div>
          <label htmlFor={names[2]}>
            예상 연간 수익률
            <br />
            EXPECTED RETURN
          </label>
          <input
            type="number"
            name={names[2]}
            value={inputValue[names[2]]}
            onChange={handleGetValue}
            required
            {...props}
          />
        </div>
        <div>
          <label htmlFor={names[3]}>
            투자기간
            <br />
            DURATION
          </label>
          <input
            type="number"
            name={names[3]}
            value={inputValue[names[3]]}
            onChange={handleGetValue}
            required
            {...props}
          />
        </div>
      </div>
    </article>
  );
}
