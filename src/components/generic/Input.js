import React from 'react';
import "./Input.css";

const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}:</label>
      <input className="input-field" type="number" {...props} />
    </div>
  );
};

export default Input;