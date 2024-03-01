import React from 'react';
import "./style.css"

type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean
};

const Button: React.FC<ButtonProps> = ({ onClick, text, disabled=false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
