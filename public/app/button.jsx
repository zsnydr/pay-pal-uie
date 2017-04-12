import React from 'react';

const Button = ({ name, value, className, clickHandler, label }) => {
  const attributes = {
    name,
    value,
    className,
    onClick: clickHandler
  };

  return <button {...attributes}>{label}</button>;
};

export default Button;


/*style={{background: 'linear-gradient(white, grey)'}}*/
