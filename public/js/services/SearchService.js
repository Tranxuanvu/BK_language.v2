angular.module('SearchService', []).factory('Search', ['$http', function ($http) {
        return {
            Search: function (patten) {
                return $http.post('/api/post/search', { patten: patten }).then(function (result) {
                    return result.data;
                });
            }
        };
    }]);