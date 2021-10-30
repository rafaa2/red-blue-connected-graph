import React, { InputHTMLAttributes, useState } from "react";

interface ValidatedGraphInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}
export default function ValidatedGraphInput(props: ValidatedGraphInputProps) {
  const { onChange, value } = props;
  const [_value, setValue] = useState(value);

  // Handle Change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onChange && onChange(e);
    console.log("Onchage", onChange);
  }

  return (
    <input
      {...props}
      type="text"
      value={_value}
      onChange={(e) => handleChange(e)}
    />
  );
}
