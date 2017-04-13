import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ name, label, changeHandler }) => (
  <div className="text-input">
    <label htmlFor={name}>
      {label}
      <br />
      <textarea type="text" id={name} name={name} onChange={changeHandler} />
    </label>
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  changeHandler: PropTypes.func
};

export default TextArea;
