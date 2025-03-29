export default function Input({ label, name, textarea, ...props }) {
  return (
    <div className="flex inputContainer">
      <label htmlFor={name} required>
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          {...props}
          className="inputStyle textArea"
          required
        ></textarea>
      ) : (
        <input name={name} {...props} className="inputStyle" required />
      )}
    </div>
  );
}
