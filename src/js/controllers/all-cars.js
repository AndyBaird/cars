'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var loadCars = require('../services/cars-service');

router.route('', 'cars', function (){ 
  loadCars().then(renderCars);
  

    function renderCars(carsArray) {
      //remove first line of names from DOM
      carsArray.shift();
      var carsTemplate = views['cars-template'];
      var templateFn = _.template(carsTemplate, { variable: 'm' });
      var carsHTML = templateFn({ cars: carsArray });
      
      $('.main-container').html(carsHTML);
    
    
    }
});
