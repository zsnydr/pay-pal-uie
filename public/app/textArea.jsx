import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ value, name, label, changeHandler }) => (
  <div className="text-input">
    <label htmlFor={name}>
      {label}
      <br />
      <textarea type="text" id={name} name={name} value={value} onChange={changeHandler} />
    </label>
  </div>
);

TextArea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  changeHandler: PropTypes.func
};

export default TextArea;
