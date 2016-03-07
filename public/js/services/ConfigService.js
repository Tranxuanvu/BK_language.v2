angular.module('ConfigService', []).factory('Config', ['$http', function ($http) {
        return {
            loadConfig: function () {
                return $http.post('/api/config/get_config').then(function (result) {
                    return result.data;
                })
            }
        };
    }]);