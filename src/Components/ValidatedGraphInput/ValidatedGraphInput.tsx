import React, { InputHTMLAttributes } from "react";
import { validateGraphInputString } from "../../util/graph-string";

interface ValidatedGraphInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}
export default function ValidatedGraphInput(props: ValidatedGraphInputProps) {
  const { onChange, value } = props;

  // Handle Change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let str = e.target.value;
    e.target.value = validateGraphInputString(str);
    onChange && onChange(e);
  }

  return (
    <input
      {...props}
      type="text"
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
}
