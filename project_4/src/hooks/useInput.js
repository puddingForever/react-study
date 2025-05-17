import { useState } from "react";

export function useInput(defaultValue = "") {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };

  return {
    value: enteredValue,
    handleInputChange,
  };
}
