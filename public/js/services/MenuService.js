angular.module('MenuService', []).factory('Menu', ['$http', function ($http) {
        return {
            getMenu: function (menu_id) {
                return $http.post('/api/main/menu', { menu_id: menu_id }).then(function (result) {
                    return result.data;
                });
            }
        };
    }]);