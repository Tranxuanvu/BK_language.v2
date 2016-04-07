angular.module('MainService', []).factory('Main', ['$http', function ($http) {
        return {
            getPost: function (data) {
                return $http.post('/api/main/getpost/', data).then(function (result) {
                    return result.data;
                });
            },

            loadHomeConfig: function () {
                return $http.post('/api/config/load_home_config').then(function (result) {
                    return result.data;
                })
            }
        };
    }]);