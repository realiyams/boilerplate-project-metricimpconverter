'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    
    const { input } = req.query

    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input).toLowerCase()
    let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    if ((initNum === 'invalid number') && (returnUnit === 'invalid unit'))
      res.json('invalid number and unit')
    else if (initNum === 'invalid number')
      res.json(initNum)
    else if (returnUnit === 'invalid unit')
      res.json(returnUnit)
    else
      res.json({
        initNum: initNum,
        initUnit: (initUnit === 'l') ? initUnit.toUpperCase() : initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string
      })
  })
};
