import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, className, clickHandler, label }) => {
  const attributes = {
    name,
    className,  // TODO: investigate passing className as props
    onClick: clickHandler
  };
  return <button {...attributes}>{label}</button>;
};

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
  label: PropTypes.string
};

export default Button;
