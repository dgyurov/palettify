'use strict';
angular.module('PalettifyApp', [])
 .controller('MainController', function($scope,$http) {
     $scope.pContainer = true;
     $http({method: 'GET', url: 'http://www.colourlovers.com/api/palettes/top?numResults=100&format=json'})
     .success(function(data) {
       $scope.palette = Math.floor(Math.random()*data.length+1);
       $scope.titles = [];
       $scope.colors = [];
       for (var i in data) {
         $scope.colors.push(data[i].colors);
         $scope.titles.push(data[i].title);
       }
     })
     .error(function() {
       console.log('Ooooops! Something went wrong Charlie!');
     });

     $scope.nextPalette = function(){
       var last = $scope.palette;
       var next  = -1;
       while(next===-1||next===last){
         next = Math.floor(Math.random()*$scope.colors.length+1);
       }
       $scope.palette = next;
     };
});
