'use strict';

var c3 = require('c3');
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
          "Make": cells[46],
          "Model": cells[47],
          "Year": cells[63],
          "Transmission": cells[57],
          "Cylinders": cells[22],
          "City MPG": cells[4],
          "Highway MPG": cells[34]
        };

      });
    }
  

   function renderCar(carArray) {
    var car = _.findWhere(carArray, { id: parseInt(carId) });
    var carTemplate = views['car-template'];
    var templateFn = _.template(carTemplate, { variable: 'm' });
    var carHTML = templateFn(car);
    
    $('.main-container').html(carHTML);

      c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
    });
    }
});