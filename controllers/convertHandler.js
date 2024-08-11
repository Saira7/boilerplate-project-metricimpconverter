function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    // Match valid numbers, including fractions
    let match = input.match(/^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)|(\d+(\.\d+)?)/);
    if (match) {
      try {
        // Check for double fractions
        if (input.split('/').length > 2) {
          throw new Error('Invalid number');
        }
        result = eval(match[0]); // Use eval to handle fractions like 3/4
        if (isNaN(result) || result <= 0) throw new Error('Invalid number');
        return result;
      } catch (e) {
        return 'invalid'; // Return 'invalid' if evaluation fails
      }
    }
    // Check if input contains only a unit
    if (/^[a-zA-Z]+$/.test(input)) {
      return 1; // Default to 1 if no numerical input is provided
    }
    return 'invalid'; // Return 'invalid' if no valid number is found
  };

  this.getUnit = function(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let match = input.match(/[a-zA-Z]+$/);
    if (match) {
      let unit = match[0].toLowerCase();
      if (unit === 'l') {
        return 'L'; // Special case for liters
      }
      return units.includes(unit) ? unit : 'invalid';
    }
    return 'invalid'; // Return 'invalid' if no unit is found
  };

  this.getReturnUnit = function(initUnit) {
    const unitConversions = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitConversions[initUnit.toLowerCase()] || 'invalid'; // Return 'invalid' if unit is not found
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitNames[unit] || 'invalid unit'; // Return 'invalid unit' if unit is not found
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'invalid' || isNaN(initNum) || initNum <= 0) {
      return 'invalid'; // Return 'invalid' if unit is not found or number is invalid
    }
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid'; // Return 'invalid' if unit is not found
    }

    return parseFloat(result.toFixed(5)); // Round result to 5 decimal places
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return `${initNum} ${unitNames[initUnit]} converts to ${returnNum} ${unitNames[returnUnit]}`;
  };

}

module.exports = ConvertHandler;