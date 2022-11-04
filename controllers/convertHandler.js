let regex  = /[a-z]+|[^a-z]+/gi
let numRegex = /\d/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    result = input.match(regex)[0]
    if(!numRegex.test(result)) result = 1

    if (result.toString().includes('/')) {
      let values = result.toString().split('/')

      if (values.length != 2) return 'invalid number'

      values[0] = parseFloat(values[0])
      values[1] = parseFloat(values[1])
      result = (values[0] / values[1]).toFixed(5)
    }
    return (!isNaN(result) ? parseFloat(result) : 'invalid number');
  };
  
  this.getUnit = function(input) {
    let result;
    let units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']

    result = input.match(regex)[1]
    if(!result) result = input.match(regex)[0]
    
    return (units.includes(result.toLowerCase())) ? result : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    switch (initUnit) {
      case 'gal':
        result = 'L'
        break;
      case 'l':
        result = 'gal'
        break;
      case 'lbs':
        result = 'kg'
        break;
      case 'kg':
        result = 'lbs'
        break;
      case 'mi':
        result = 'km'
        break;
      case 'km':
        result = 'mi'
        break;
    
      default:
        result = 'invalid unit'
        break;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch (unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = [];

    let returnUnit = this.getReturnUnit(initUnit)

    if ((returnUnit === 'L') || (returnUnit === 'l')) result[0] = (initNum * galToL).toFixed(5)
    else if (returnUnit === 'gal') result[0] = (initNum / galToL).toFixed(5)
    else if (returnUnit === 'kg') result[0] = (initNum * lbsToKg).toFixed(5)
    else if (returnUnit === 'lbs') result[0] = (initNum / lbsToKg).toFixed(5)
    else if (returnUnit === 'km') result[0] = (initNum * miToKm).toFixed(5)
    else if (returnUnit === 'mi') result[0] = (initNum / miToKm).toFixed(5)
    else result[0] = 0

    result[0] = parseFloat(result[0])
    result[1] = returnUnit
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result;
  }; 
  
}

module.exports = ConvertHandler;
