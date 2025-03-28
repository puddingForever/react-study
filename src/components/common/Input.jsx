import React from 'react';

// 공통으로 사용하는 Input
const Input = ({ label, name, value, onChange, type = "text", placeholder = "", required = false, className = "" }) => {
  const renderInput = () => {
    const inputProps = {
      name,
      value,
      onChange,
      className: `w-full p-2 focus:outline-none border border-gray-300 rounded-md ${className}`,
      placeholder,
      required,
    };

    if (type === "textarea") {
      return (
        <textarea
          {...inputProps}
          className={`${inputProps.className} h-24`}
        />
      );
    }

    return <input type={type} {...inputProps} />;
  };

  return (
    <div className="flex flex-col mb-6">
      {label && (
        <label className="block text-gray-600 text-sm font-medium mb-2">{label}</label>
      )}
      {renderInput()}
    </div>
  );
};

export default Input;