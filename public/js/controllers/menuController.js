angular.module('menuController', []).controller('menuController', function ($scope, $sce, Menu) {
    
    $scope.loadMenu = function (menuId, menuVarName){
        Menu.getMenu(menuId).then(function (data) {
            $scope[menuVarName] = data;
        });
    }
});