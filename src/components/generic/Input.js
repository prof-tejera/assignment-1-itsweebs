import React from 'react';
import "./Input.css";

const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}:</label>
      <input className="input-field" type="text" pattern="\d{2}:\d{2}" maxLength="5" {...props} />
    </div>
  );
};

export default Input;