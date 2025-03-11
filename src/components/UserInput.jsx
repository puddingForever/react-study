export default function UserInput({ label, inputValue, setUserValue, ...props }) {
  const names = Object.keys(inputValue);
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setUserValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <article id="user-input">
      <div className="input-group">
        <div>
          <label htmlFor={names[0]}>INITIAL INVESTMENT</label>
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
          <label htmlFor={names[1]}>ANNUAL INVESTMENT</label>
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
          <label htmlFor={names[2]}>INITIAL INVESTMENT</label>
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
          <label htmlFor={names[3]}>ANNUAL INVESTMENT</label>
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
