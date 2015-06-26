'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'cars', function (){ 

  $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })

    
  .then(parseCarsCSV)
  .then(renderCars);
  
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
          mpgData: cells[48],
          year: cells[63],
          trany: cells[57],
          cylinders: cells[22]
        };
      }); 
  }
    function renderCars(carsArray) {
      //remove first line of names from DOM
      carsArray.shift();
      var carsTemplate = views['cars-template'];
      var templateFn = _.template(carsTemplate, { variable: 'm' });
      var carsHTML = templateFn({ cars: carsArray });
      
      $('.main-container').html(carsHTML);
    }
});
