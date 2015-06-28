'use strict';

var c3 = require('c3');
var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var loadCars = require('../services/cars-service');


router.route('cars/:id', function (carId){
 loadCars().then(renderCar);
  
   function renderCar(carsArray) {
      var car = _.findWhere(carsArray, { id: parseInt(carId) });
      var carTemplate = views['car-template'];
      var templateFn = _.template(carTemplate, { variable: 'm' });
      var carHTML = templateFn(car);
  
      $('.main-container').html(carHTML);
            renderChart(car, carsArray);
   }  
  
      function renderChart(car, carsArray) {
        var allCarsMPG = _.pluck(carsArray, 'highwayMPG');         
        
        function stringToNum(str){
          var numArray = [];
          for (var i = 0; i < str.length; i++)
            numArray.push(parseInt(str[i]));
          return numArray;
        }
        var numAllCarsMPG = stringToNum(allCarsMPG);
        //eliminate any value under 1
        var parsedAllCarsMPG = _.filter(numAllCarsMPG, function(num){return num > 0;});
        //find the avg MPG for all vehicles in the collection  
        var totalAllCarsMPG = parsedAllCarsMPG 
        .reduce(function(x, y){
          return x + y;
        });
        var avgAllcarsMPG = totalAllCarsMPG / parsedAllCarsMPG.length;
           
          c3.generate({
            bindto: '.chart',
            data: {
              columns: [
                ['Avg Highway MPG of all Cars', avgAllcarsMPG],
                ['This cars Highway MPG', car.highwayMPG]
              ],
              type : 'bar'
            },
            color: {
              pattern: ['#3FBEBB', '#FF5843', '#39B54A']
            }
          });
         
      }
});