angular.module('mainController', []).controller('MainController', function($scope, $sce, $window, $location, $anchorScroll, $timeout, Main, NgMap) {
  Main.loadHomeConfig().then(function (config) {
    $scope.homeConfig = config;
  });
  NgMap.getMap({id:"map"}).then(function(map) {       
    map.showInfoWindow('bar', 'marker');
  });

  $scope.redirect = function (uri) {
    $window.location.href = uri;
  }

  $scope.scrollTo = function (id) {
    $timeout( function(){
      $('html,body').animate({
        scrollTop: $(id).offset().top - 110
      }, 600);
    }, 1000);
  }

  $scope.scrollToTop = function () {
    $('html,body').animate({scrollTop: 0}, 600);
  }

  $scope.stopVideo = function(){
    var outerDiv = document.getElementById("video-show");
    var youtubeIframe = outerDiv.getElementsByTagName("iframe")[0].contentWindow;
    youtubeIframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  }
});