angular.module('BlocksService', []).factory('Blocks', ['$http', function ($http) {
    return {
        loadBlocksConfig: function () {
            return $http.post('/api/config/load_blocks_config').then(function (result) {
                return result.data;
            })
        }
    };
}]);