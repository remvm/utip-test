import React from "react";
import "./style.css";

interface InputProps {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, id, value, onChange }) => {
  return (
    <div className={"input-wrapper"}>
      <label className={"label"} htmlFor={id}>
        {label}
      </label>
      <input
        className={"input"}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
