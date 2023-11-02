import React from 'react';
import "./Button.css";

const Button = ({ label, onClick, ...props }) => {
  return (
    <button className={`button ${props.className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;