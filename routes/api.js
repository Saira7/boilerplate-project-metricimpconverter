'use strict';

const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

module.exports = function (app) {
  
  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    
    // Check if input is provided
    if (!input) {
      return res.status(400).json({ error: 'No input provided' });
    }
    
    // Extract number and unit from input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    
    // Check if the unit is valid
    if (initUnit === 'invalid') {
      return res.status(400).json({ error: 'Invalid unit' });
    }
    
    // Handle invalid number input
    if (isNaN(initNum)) {
      return res.status(400).json({ error: 'Invalid number' });
    }
    
    // Convert the input to returnUnit
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const spelledOutUnit = convertHandler.spellOutUnit(initUnit);
    const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    
    // Handle conversion errors
    if (returnUnit === 'invalid') {
      return res.status(400).json({ error: 'Invalid unit' });
    }
    
    // Respond with the conversion result
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    });
  });

};
