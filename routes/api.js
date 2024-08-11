'use strict';

const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

module.exports = function (app) {
  
app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const number = convertHandler.getNum(input);
  const unit = convertHandler.getUnit(input);

  if (number === 'invalid' && unit === 'invalid') {
    return res.status(400).json({ error: 'Invalid number and unit' });
  }
  if (unit === 'invalid') {
    return res.status(400).json({ error: 'Invalid unit' });
  }
  if (number === 'invalid') {
    return res.status(400).json({ error: 'Invalid number' });
  }

  const returnUnit = convertHandler.getReturnUnit(unit);
  if (returnUnit === 'invalid') {
    return res.status(400).json({ error: 'Invalid unit' });
  }

  const returnNum = convertHandler.convert(number, unit);

  res.status(200).json({
    initNum: number,
    initUnit: unit,
    returnNum: returnNum,
    returnUnit: returnUnit,
    string: convertHandler.getString(number, unit, returnNum, returnUnit)
  });
});
  
};