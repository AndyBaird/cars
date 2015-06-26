'use strict';

var bulk = require('bulk-require');
var router = require('./router');

// Require all of our controllers
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();



var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('./router');


  $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })
    
  .then(parseCarsCSV)
  .then(renderCars);
  
  function parseCarsCSV(carsCSV){
   return carsCSV
     .split('\n')
     .map(function (carRecord) {
        // console.log(carRecord);
        var cells = carRecord.split(',');
        return {
          make: cells[46],
          model: cells[47],
          mpgData: cells[48],
          year: cells[63]
        };
        
      });
      
  }
    function renderCars(carsArray) {
    var carsTemplate = views['cars-template'];
    var templateFn = _.template(carsTemplate, { variable: 'm' });
    var carsHTML = templateFn({ cars: carsArray });
    
    $('.main-container').html(carsHTML);
  }
  
  