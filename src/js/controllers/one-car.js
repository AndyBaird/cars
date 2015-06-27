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
          Make: cells[46],
          Model: cells[47],
          Year: cells[63],
          Transmission: cells[57],
          Cylinders: cells[22],
          CityMPG: cells[4],
          HighwayMPG: cells[34]
        };

      });
    }

   function renderCar(carsArray) {
      var car = _.findWhere(carsArray, { id: parseInt(carId) });
      var carTemplate = views['car-template'];
      var templateFn = _.template(carTemplate, { variable: 'm' });
      var carHTML = templateFn(car);
      
      renderChart(car, carsArray);
  
      $('.main-container').html(carHTML);
  
      function renderChart(car, carsArray) {
        var allCarsMPG = _.pluck(carsArray, 'HighwayMPG');         
        
        function stringToNum(str){
          var numArray = [];
          for (var i = 0; i < str.length; i++)
            numArray.push(parseInt(str[i]));
          return numArray;
        }
        
        var numAllCarsMPG = stringToNum(allCarsMPG);
        
        //eliminate any value under 1
        var parsedAllCarsMPG = _.filter(numAllCarsMPG, function(num){return num > 0;});
        

         
         // var total = 0;
          // $.each(parsedAllCarsMPG,function() {
          //     total += this;
          // });
             
          var totalAllCarsMPG = parsedAllCarsMPG 
          .reduce(function(x, y){
            return x + y;
          });
          console.log(totalAllCarsMPG);
      };
        
 
        
        // c3.generate({
        //   bindto: '#chart',
        //   data: {
        //     columns: [
        //       ['allCarsMPG', allCarsMPG],
        //     ],
        //     type : 'pie'
        //   },
        //   color: {
        //     pattern: ['#3FBEBB', '#FF5843', '#39B54A']
        //   }
        // });
      // }
   }
});