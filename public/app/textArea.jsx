import React from 'react';

const TextArea = ({ name, value, label, changeHandler, children }) => {
  return (
    <div className="text-input">
      <label htmlFor={name}>
        {label}
        <br />
        <textarea type="text" id={name} name={name} value={value} onChange={changeHandler} />
      </label>
      {children}
    </div>
  );
};

export default TextArea;
