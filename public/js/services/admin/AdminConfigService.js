angular.module('AdminConfigService', []).factory('AdminConfig', ['$http', function ($http) {
        return {
            saveConfig: function (config) {
                return $http.post('/api/admin/config/save', config).then(function (result) {
                    return result.data;
                })
            },
            loadConfig: function () {
                return $http.post('/api/config/get_config').then(function (result) {
                    return result.data;
                })
            }
        };
    }]);