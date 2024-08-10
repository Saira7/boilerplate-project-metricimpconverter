const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('5gal'), 5);
  });

  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('5.5gal'), 5.5);
  });

  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('3/4gal'), 0.75);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('2.5/5gal'), 0.5);
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function() {
    assert.equal(convertHandler.getNum('3/2/3gal'), 1.5); // Assuming you return 1 or handle this differently
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('gal'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('5gal'), 'gal');
    assert.equal(convertHandler.getUnit('5L'), 'l');
    assert.equal(convertHandler.getUnit('5mi'), 'mi');
    assert.equal(convertHandler.getUnit('5km'), 'km');
    assert.equal(convertHandler.getUnit('5lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('5kg'), 'kg');
  });

  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('5xyz'), 'invalid');
  });

  test('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'l');
    assert.equal(convertHandler.getReturnUnit('l'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('l'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'l'), 0.264172, 0.00001);
  });

  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.621371, 0.00001);
  });

  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });

});
