import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div className="send-error">{message}</div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
