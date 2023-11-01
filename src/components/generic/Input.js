import React from 'react';

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label>{label}: </label>
      <input type="number" {...props} />
    </div>
  );
};

export default Input;