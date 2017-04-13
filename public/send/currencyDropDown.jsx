import React from 'react';
import PropTypes from 'prop-types';
import currencyLookUpList from './currencyLookUpList';

// function to map over objects, similar to Array.prototype.map
const objectMap = (obj, cb) => {
  const results = [];
  for (let key in obj) {
    const result = cb(obj[key], key);
    results.push(result);
  }
  return results;
};

const CurrencyDropDown = ({ changeHandler }) => (
  <select onChange={changeHandler}>
    {objectMap(currencyLookUpList, (value, key) => (
      <option value={key} key={key}>{key}</option>
    ))}
  </select>
);

CurrencyDropDown.propTypes = {
  changeHandler: PropTypes.func
};

export default CurrencyDropDown;
