;(function() {
  "use strict";

  angular.module("myApp", [ "uiGmapgoogle-maps" ] )
    .controller("MapController", function($http, $scope) {
      var vm = this;
      $http.get("https://geomarker-roulette.firebaseio.com/.json")
      .success(function(data) {
        vm.Marker = data;
        console.log("it works!");
      })
      .error(function(err) {
        console.log(err);
      })

      var randomLat = Math.floor((Math.random() * 89) + 1)
      var randomLong = Math.floor((Math.random() * 100) + 1)

      $scope.map = {
        center: { latitude: randomLat, longitude: randomLong },
        zoom: 4
      }

      $scope.options = {scrollwheel: false, minZoom: 3};

      $scope.marker = {
        id: 0,
        message: "What is my Latitude and Longitude?",
        options: { animation: google.maps.Animation.DROP },
        icon: 'http://png.findicons.com/files/icons/2232/wireframe_mono/48/target.png',
        coords: { latitude: randomLat, longitude: randomLong }
      }

      $scope.markerList = vm.Marker;

    vm.addNewMarker = function(){
    var url = "https://geomarker-roulette.firebaseio.com/.json";
    $http.post(url, vm.newMarker)
      .success(function(data){
        vm.Marker[data.name] = vm.newMarker;
        vm.newMarker = null;
        console.log("it works!");
      })
      .error(function(err){
        console.log(err);
      })
    }

     vm.deleteMarker = function(markerId){
      var url = "https://geomarker-roulette.firebaseio.com/" + markerId + ".json";
      $http.delete(url)
      .success(function(){
        delete vm.Marker[markerId]
        console.log("it works!");
      })
      .error(function(err){
        console.log(err);
      })
    }

    });
}());
