angular.module('AdminMenuService', []).factory('AdminMenu', ['$http', function ($http) {
        
        return {
            
            getMenus: function () {
                return $http.post('/api/admin/menu').then(function (result) {
                    return result.data;
                })
            },
            
            saveMenu: function (data) {
                return $http.post('/api/admin/update_menu', data);
            }
        };

    }]);