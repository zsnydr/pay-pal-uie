import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ value, name, label, changeHandler, children }) => (
  <div className="text-input">
    <label htmlFor={name}>
      {label}
      <input type="text" id={name} name={name} value={value} onChange={changeHandler} />
    </label>
    {children}
  </div>
);

TextInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  changeHandler: PropTypes.func,
  children: PropTypes.node
};

export default TextInput;
