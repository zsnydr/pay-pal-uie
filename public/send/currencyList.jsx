import React from 'react';
import currencyLookUp from './currencyLookUp';

// function to map over objects, similar to Array.prototype.map
const objectMap = (obj, cb) => {
  const results = [];
  for (let key in obj) {
    const result = cb(obj[key], key);
    results.push(result);
  }
  return results;
};

const CurrencyList = ({ changeHandler }) => (
  <select onChange={changeHandler}>
    {objectMap(currencyLookUp, (value, key) => {
      return <option value={key} key={key}>{key}</option>;
    })}
  </select>
);

export default CurrencyList;
