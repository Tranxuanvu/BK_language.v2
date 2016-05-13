angular.module('adminBlocksConfigController', []).controller('AdminBlocksConfigController', function ($scope, $window, Upload, $location, $cookieStore, AdminBlocksConfig) {
    var user = $cookieStore.get('user') || null;
    
    if (user == null) {
        $window.location.href = '/admin/login';
    }
    else {
        $scope.blocksConfig = { p: [{ items: [] }] };
        
        AdminBlocksConfig.loadConfig().then(function (data) {
            if (data.p != null) {
                $scope.blocksConfig = data;
            }
        });
        
        $scope.save = function () {
            AdminBlocksConfig.saveConfig($scope.blocksConfig).then(function (result) {
                // console.log(result);
                alert("Lưu thành công!");
            });
        };
        
        $scope.uploadImage = function (item, field) {
            console.log(item);
            Upload.upload({
                url: '/api/uploads',
                method: 'POST',
                withCredentials: true,
                data: { file: $scope.file }
            }).then(function (resp) {
                if (item != null) {
                    item[field] = resp.data;
                }
            });

            $scope.file = null;
        };
        
        $scope.clickOnUpload = function (item, field) {
            document.getElementById('upload').click();
            $scope.currentUploadItem = item;
            $scope.currentUploadField = field;
        };
    }
});