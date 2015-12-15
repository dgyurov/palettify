/*jshint bitwise: false*/
/*global angular:false */
/*global document:false */

'use strict';
angular.module('PalettifyApp', ['ngAnimate'])
 .controller('MainController', function($scope,$http,$timeout) {
     $scope.dataLoaded = false;
     $scope.pContainer = true;
     $scope.backgroundclr = 'whitebg';
     $scope.buttonclr = 'darkbg';
     $scope.invert = true;

     $http({method: 'GET', url: 'app/data.json'})
     .success(function(data) {
       $scope.palette = Math.floor(Math.random()*data.length);
       $scope.titles = [];
       $scope.colors = [];
       $scope.lumi = [];

       for (var i in data) {
         $scope.colors.push(data[i].colors);
         $scope.titles.push(data[i].title);
       }

       angular.element(document.getElementsByClassName('tooltipnow')).tooltip();
       $scope.dataLoaded = true;
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
         $scope.buttonclr = 'whitebg';
         $scope.invert = false;
       }else{
         $scope.backgroundclr = 'whitebg';
         $scope.buttonclr = 'darkbg';
         $scope.invert=true;
       }
     };

     $scope.isLight = function(hex){
       var rgb,r,g,b,l;
       rgb = parseInt(hex, 16);
       r = (rgb >> 16) & 0xff;
       g = (rgb >>  8) & 0xff;
       b = (rgb >>  0) & 0xff;
       l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
       console.log('Lumi is: '+l);
       if(l>220){
         return true;
       }else{
         return false;
       }
     };
});
