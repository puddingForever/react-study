export default function InputWrapper({ label, name, type, amount, onChange }) {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input
          value={amount}
          name={name}
          onChange={(e) => onChange(e, name)}
          type={type}
          required
        />
      </>
    );
  }