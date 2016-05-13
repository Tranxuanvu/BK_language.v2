angular.module('blocksController', []).controller('BlocksController', function($scope, Blocks) {
    
    Blocks.loadBlocksConfig().then(function (config) {
        $scope.blocksConfig = config;
    });

});