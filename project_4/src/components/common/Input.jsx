export default function Input({ label }) {
  return (
    <>
      <div className="control">
        <label htmlFor="">{label}</label>
        <input type="text" />
      </div>
    </>
  );
}
