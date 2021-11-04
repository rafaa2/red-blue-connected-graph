import React, { InputHTMLAttributes } from "react";
import { validateGraphInputString } from "../../util/graph-string";

interface ValidatedGraphInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelClass?: string;
  lable?: string;
}
export default function ValidatedGraphInput(props: ValidatedGraphInputProps) {
  const { onChange, value, labelClass, lable } = props;

  // Handle Change
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let str = e.target.value;
    e.target.value = validateGraphInputString(str);
    onChange && onChange(e);
  }

  return (
    <>
      {lable && (
        <label htmlFor="validated-input" className={labelClass}>
          {lable}
        </label>
      )}
      <input
        {...props}
        type="text"
        id="validated-input"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}
