import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ children }) => (
  <footer className="footer">{children}</footer>
);

Footer.propTypes = {
  children: PropTypes.node
};

export default Footer;
