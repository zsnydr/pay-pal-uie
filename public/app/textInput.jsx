import React from 'react';

const TextInput = ({ newLine, name, value, label, changeHandler, children }) => {
  return (
    <div className="text-input">
      <label htmlFor={name}>
        {label}
        {newLine === 'true' && <br />}
        <input type="text" id={name} name={name} value={value} onChange={changeHandler} />
      </label>
      {children}
    </div>
  );
};

export default TextInput;
