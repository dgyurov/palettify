'use strict';
angular.module('PalettifyApp', ['ngAnimate'])
 .controller('MainController', function($scope,$http,$timeout) {

     $scope.pContainer = true;
     $scope.backgroundclr = 'whitebg';

     $http({method: 'GET', url: 'http://www.colourlovers.com/api/palettes/top?numResults=100&format=json'})
     .success(function(data) {
       $scope.palette = Math.floor(Math.random()*data.length);
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

     $scope.nextPalette = function($event){
       $event.stopPropagation();
       $scope.pContainer = false;
       $timeout(function(){
         var last = $scope.palette;
         var next  = -1;
         while(next===-1||next===last){
           next = Math.floor(Math.random()*$scope.colors.length);
         }
         $scope.palette = next;
         $scope.pContainer = true;
       }, 300);
     };

     $scope.changeBackground = function(){
       if ($scope.backgroundclr==='whitebg') {
         $scope.backgroundclr = 'darkbg';
       }else{
         $scope.backgroundclr = 'whitebg';
       }
     };
});
