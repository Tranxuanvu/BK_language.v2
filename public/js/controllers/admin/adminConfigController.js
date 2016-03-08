angular.module('adminConfigController', []).controller('AdminConfigController', function ($scope, $route, $window, $location, $cookieStore, AdminConfig) {
    
    var user = $cookieStore.get('user') || null;
    
    if (user == null) {
        $window.location.href = '/admin/login';
    }
    else {
        $scope.config = {};

        AdminConfig.loadConfig().then(function (data) {
            $scope.config = data;
            
            if (data.consults == null) {
                data.consults = [];
            }
            
            if (data.services == null) {
                data.services = [];
            }

            $scope.delete = function (leaf, branch) {
                branch = branch || $scope.config.consults;
                var index = branch.indexOf(leaf);
                if (index != -1) {
                    branch.splice(index, 1);
                }
            };
        });

        $scope.saveConfig = function (){
            for (i in $scope.config.consults) {
                $scope.config.consults[i].collapse = true;
            }

            AdminConfig.saveConfig($scope.config).then(function (result) {
                console.log(result);
            });
        }
    }
});