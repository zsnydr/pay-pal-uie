import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ label }) => (
  <div className="header">{label}</div>
);

Header.propTypes = {
  label: PropTypes.string
};

export default Header;
