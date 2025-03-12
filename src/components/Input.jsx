export default function Input({ label, inputValue, name, handleGetValue }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input type="number" name={name} value={inputValue[name]} onChange={handleGetValue} required />
    </>
  );
}
