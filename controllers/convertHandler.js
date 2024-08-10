function ConvertHandler() {

  this.getNum = function(input) {
    let result;
    let match = input.match(/(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/);
    if (match) {
      result = eval(match[0]); // Use eval to handle fractions like 3/4
    }
    if (isNaN(result)) result = 1; // Default to 1 if no number is found
    return result;
  };

  this.getUnit = function(input) {
    let result;
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let match = input.match(/[a-zA-Z]+$/);
    if (match && units.includes(match[0].toLowerCase())) {
      result = match[0].toLowerCase();
    } else {
      result = 'invalid'; // Return 'invalid' for unknown units
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const unitConversions = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitConversions[initUnit] || 'invalid'; // Return 'invalid' if unit is not found
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
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
    
    switch(initUnit) {
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
    
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return `${initNum} ${unitNames[initUnit]} converts to ${returnNum} ${unitNames[returnUnit]}`;
  };

}

module.exports = ConvertHandler;
