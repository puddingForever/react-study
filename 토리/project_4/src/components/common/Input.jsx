export default function Input({ label, name }) {
  return (
    <>
      <div className="control">
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} />
      </div>
    </>
  );
}
