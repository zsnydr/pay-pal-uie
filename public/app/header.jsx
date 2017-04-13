import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ label }) => (
  <header className="header">{label}</header>
);

Header.propTypes = {
  label: PropTypes.string
};

export default Header;
