import React from 'react';

const TextInput = ({ name, value, label, children }) => {
  return (
    <div style={{ border: '1px solid grey' }}>
      <label htmlFor={name}>
        {label}
        <input type="text" name={name} value={value} />
      </label>
      {children}
    </div>
  );
};

export default TextInput;
