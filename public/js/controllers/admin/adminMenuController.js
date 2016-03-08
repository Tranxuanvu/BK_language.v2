angular.module('adminMenuController', ['ckeditor']).controller('AdminMenuController', function ($http, $scope, $rootScope, $cookieStore, Upload, $window, NgTableParams, AdminMenu) {
    
    var user = $cookieStore.get('user') || null;
    
    
    $rootScope.logout = function () {
        $cookieStore.remove('user');
        $window.location.href = '/admin/login';
    }
    
    if (user == null) {
        $window.location.href = '/admin/login';

    }
    else {
        AdminMenu.getMenus().then(function (data) {
            $scope.menus = data;
            $scope.selectedMenu = 0;
            $scope.menuEditing = null;
            $scope.menu = [];
        });
    }
    
    $scope.options = {
        language: 'vi',
        allowedContent: true,
        entities: false,
        startupMode : 'source',
        tabSpaces: 2
    };
    
    $scope.onEditMenuContent = function (menu) {
        $scope.menuEditing = menu;
        $scope.htmlEditor = menu.content;
    }
    
    $scope.onSaveContent = function () {
        $scope.menuEditing.content = $scope.htmlEditor;
        $scope.htmlEditor = '';
    }
    
    $scope.delete = function (leaf, branch) {
        branch = branch || $scope.menus;
        var index = branch.indexOf(leaf);
        if (index != -1) {
            branch.splice(index, 1);
        }
    };
    
    $scope.add = function (data) {
        data.submenus.push({ id: null, name: '', uri: '' , submenus: [] , parent_id: -1, content: '', collapse: false });
    };
    
    $scope.save = function () {
        addSlash($scope.menu);
        AdminMenu.saveMenu($scope.menu);
    };
    
    function addSlash(menus) {
        for (i in menus) {
            if (!menus[i].uri.startsWith('/')) {
                menus[i].uri = '/' + menus[i].uri;
            }
            
            addSlash(menus[i].submenus);
        }
    }
});
