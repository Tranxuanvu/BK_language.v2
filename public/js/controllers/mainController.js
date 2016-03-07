angular.module('mainController', []).controller('MainController', function($scope, $sce, $location, $anchorScroll, Main) {
    Main.loadHomeConfig().then(function (config) {
        $scope.homeConfig = config;
    });
});