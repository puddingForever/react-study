import { useState } from "react";

export function useInput(defaultValue = "") {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const handleInputChange = (e) => {
    setEnteredValue(e.target.value);
  };
  const handleInputBlur = () => {
    setDidEdit(true);
  };
  return {
    value: enteredValue,
    handleInputChange,
    didEdit,
  };
}
