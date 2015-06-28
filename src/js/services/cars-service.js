'use strict';
var $ = require('jquery');

var promise = $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })
  .then(parseCarsCSV);
  
  function parseCarsCSV(carsCSV){
   var counter = 0;
   return carsCSV
     .split('\n')
     .map(function (carRecord) {
        var cells = carRecord.split(',');
        counter += 1;
        return {
          id: counter,
          make: cells[46],
          model: cells[47],
          year: cells[63],
          transmission: cells[57],
          cylinders: cells[22],
          cityMPG: cells[4],
          highwayMPG: cells[34]
        };
      }); 
  }
  
  function loadCars() {
  return promise;
}

module.exports = loadCars;