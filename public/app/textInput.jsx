import React from 'react';

const TextInput = ({ name, value, label, changeHandler, children }) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
        <input type="text" name={name} value={value} onChange={changeHandler} />
      </label>
      {children}
    </div>
  );
};

export default TextInput;
