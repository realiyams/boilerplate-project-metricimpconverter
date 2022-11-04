const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('ConvertHandler.getNum(input)', () => {
    test('whole number input', (done) => {
      let input = '4gal'
      assert.equal(convertHandler.getNum(input), 4)
      done()
    })

    test('decimal number input', (done) => {
      let input = '2.5gal'
      assert.equal(convertHandler.getNum(input), 2.5)
      done()
    })

    test('fractional number input', (done) => {
      let input = '2/5gal'
      assert.equal(convertHandler.getNum(input), 0.4)
      done()
    })

    test('fractional input with decimal', (done) => {
      let input = '2.5/2.5gal'
      assert.equal(convertHandler.getNum(input), 1)
      done()
    })

    test('error on a double-fraction', (done) => {
      let input = '3/2/3gal'
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done()
    })

    test('no numerical input', (done) => {
      let input = 'gal'
      assert.equal(convertHandler.getNum(input), 1)
      assert.equal(convertHandler.getUnit(input), 'gal')
      done()
    })
  })

  suite('ConvertHandler.getUnit(input)', () => {
    test('read each valid input unit', (done) => {
      let input = ['gal', 'L', 'lbs', 'kg', 'mi', 'km']

      input.forEach(input => {
        assert.equal(convertHandler.getUnit(input), input)
      });
      done()
    })

    test('error for an invalid input unit', (done) => {
      let input = '10min'
      assert.equal(convertHandler.getUnit(input), 'invalid unit')
      done()
    })
  })

  suite('ConvertHandler.getReturn(input)', () => {
    test('return the correct return unit for each valid input unit', (done) => {
      let input = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']
      let expect = ['L', 'gal', 'kg', 'lbs', 'km', 'mi']

      input.forEach((input, index) => {
        assert.equal(convertHandler.getReturnUnit(input), expect[index])
      });
      done()
    })
  })

  suite('ConvertHandler.SpellOutUnit(input)', () => {
    test('return the spelled-out string unit for each valid input unit', (done) => {
      let input = ['gal', 'L', 'lbs', 'kg', 'mi', 'km']
      let expect = ['gallons', 'liters', 'pounds', 'kilograms', 'miles', 'kilometers']

      input.forEach((input, index) => {
        assert.equal(convertHandler.spellOutUnit(input), expect[index])
      });
      done()
    })
  })

  suite('ConvertHandler.convert(num, unit)', () => {
    test('gal to L', (done) => {
      let [initNum, initUnit] = [5, 'gal']
      let [expectedNum, expectedUnit] = [18.9271, 'L']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })

    test('L to gal', (done) => {
      let [initNum, initUnit] = [5, 'l']
      let [expectedNum, expectedUnit] = [1.32086, 'gal']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })

    test('mi to km', (done) => {
      let [initNum, initUnit] = [5, 'mi']
      let [expectedNum, expectedUnit] = [8.04672, 'km']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })

    test('km to mi', (done) => {
      let [initNum, initUnit] = [5, 'km']
      let [expectedNum, expectedUnit] = [3.10686, 'mi']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })

    test('lbs to kg', (done) => {
      let [initNum, initUnit] = [5, 'lbs']
      let [expectedNum, expectedUnit] = [2.26796, 'kg']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })

    test('kg to lbs', (done) => {
      let [initNum, initUnit] = [5, 'kg']
      let [expectedNum, expectedUnit] = [11.0231, 'lbs']

      let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
      assert.approximately(returnNum, expectedNum, 0.1)
      assert.equal(returnUnit, expectedUnit)
      done()
    })
  })
});