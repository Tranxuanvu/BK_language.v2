angular.module('mainController', []).controller('MainController', function($scope, $sce, $location, $anchorScroll, Main, NgMap) {
  Main.loadHomeConfig().then(function (config) {
    $scope.homeConfig = config;
  });
  NgMap.getMap({id:"map"}).then(function(map) {       
    map.showInfoWindow('bar', 'marker');
  });
});