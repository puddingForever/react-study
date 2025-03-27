import Input from "./Input";
import FormatTextLine from "./utill/FormatTextLine";
const TITLE = [
  "초기 투자 금액\nINITIAL INVESTMENT",
  "매년 투자 금액\nANNUAL INVESTMENT",
  "예상 연간 수익률\nEXPECTED RETURN",
  "투자기간\nDURATION",
];

export default function UserInput({ inputValue, setUserValue }) {
  const names = Object.keys(inputValue);
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    setUserValue((prev) => ({ ...prev, [name]: Number(value) || "" }));
  };

  return (
    <article id="user-input">
      {names.map((name, idx) => (
        <div key={name} className="input-group">
          <Input
            label={FormatTextLine(TITLE[idx])}
            name={name}
            inputValue={inputValue}
            handleGetValue={handleGetValue}
          />
        </div>
      ))}
    </article>
  );
}
