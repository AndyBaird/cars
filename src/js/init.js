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
  // .done(function (data){
  //   console.log(data);

    
  .then(parseCarsCSV)
  // .then(renderCars);
  
  function parseCarsCSV(carsCSV){
   console.log (carsCSV.split('\n'));
   
  }
  
  
// });