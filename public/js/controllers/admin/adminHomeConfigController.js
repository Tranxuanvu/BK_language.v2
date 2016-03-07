angular.module('adminHomeConfigController', []).controller('AdminHomeConfigController', function ($scope, $route, $window, Upload, $location, $cookieStore, AdminHomeConfig) {
    
    var user = $cookieStore.get('user') || null;
    
    if (user == null) {
        $window.location.href = '/admin/login';
    }
    else {
        $scope.homeConfig = { p: [{ items: [] }, { items: [] }, { items: [] }, { items: [] }] };
        
        AdminHomeConfig.loadConfig().then(function (data) {
            if (data.p != null) {
                $scope.homeConfig = data;
            }
        });
        
        $scope.save = function () {
            AdminHomeConfig.saveConfig($scope.homeConfig).then(function (result) {
                console.log(result);
            });
        };
        
        $scope.addReview = function (id) {
            AdminHomeConfig.loadReview(id).then(function (data) {
                if (data.length > 0) {
                    $scope.homeConfig.p[3].items.push({ title: data[0].sub_category_name, reviewer: data[0].title + ' - ' + data[0].cure, uri: '/' + data[0].category_slug + '/' + data[0].sub_category_slug + '/' + data[0].slug, description: data[0].discription });
                }
            });
        }
        
        $scope.options = {
            language: 'vi',
            allowedContent: true,
            entities: false,
            tabSpaces: 2
        };
        
        $scope.saveInput = function () {
            if ($scope.currentEditItem != null && $scope.currentEditField != '') {
                $scope.currentEditItem[$scope.currentEditField] = $scope.htmlEditor;
            }
        }
        
        $scope.editItemContent = function (item, field) {
            $scope.currentEditItem = item;
            $scope.currentEditField = field;
            $scope.htmlEditor = item[field];
        }
        
        $scope.uploadImage = function (item, field) {
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