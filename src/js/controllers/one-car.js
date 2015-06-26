'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('cars/:id', function (carId){
  $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })
  
  .then(parseCarsCSV)
  .then(renderCar);
  
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
          trany: cells[57],
          cylinders: cells[22]
        };

      });
    }
  

   function renderCar(carArray) {
    var car = _.findWhere(carArray, { id: parseInt(carId) });
    var carTemplate = views['car-template'];
    var templateFn = _.template(carTemplate, { variable: 'm' });
    var carHTML = templateFn(car);
    
    $('.main-container').html(carHTML);
  } 
});