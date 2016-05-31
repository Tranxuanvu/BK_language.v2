angular.module('appAdminRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
    .when('/admin', {
            templateUrl: 'views/partials/admin/home.html',
            controller: 'AdminMainController'
        })
    .when('/admin/cho-xet-duyet', {
            templateUrl: 'views/partials/admin/list_post.html',
            controller: 'AdminPostListController',
            status_id: 2
        })
    .when('/admin/bai-da-dang', {
            templateUrl: 'views/partials/admin/list_post.html',
            controller: 'AdminPostListController',
            status_id: 3
        })
    .when('/admin/bai-da-luu', {
            templateUrl: 'views/partials/admin/list_post.html',
            controller: 'AdminPostListController',
            status_id: 1
        })
    .when('/admin/bao-da-xoa', {
            templateUrl: 'views/partials/admin/list_post.html',
            controller: 'AdminPostListController',
            status_id: 4
        })
    .when('/admin/user', {
            templateUrl: 'views/partials/admin/list_user.html',
            controller: 'AdminUserListController',
            status_id: 5
        })
    .when('/admin/edits/:id', {
            templateUrl: 'views/partials/admin/home.html',
            controller: 'AdminPostEditController',
        })
    .when('/admin/menu', {
            templateUrl: 'views/partials/admin/menu_editor.html',
            controller: 'AdminMenuController',
		})
	.when('/admin/chinh-sua-trang-chu', {
			templateUrl: 'views/partials/admin/home_editor.html',
			controller: 'AdminHomeConfigController',
		})
    .when('/admin/chinh-sua-blocks', {
            templateUrl: 'views/partials/admin/blocks_editor.html',
            controller: 'AdminBlocksConfigController'
        })
    .when('/admin/nhap-diem', {
            templateUrl: 'views/partials/admin/input_point.html',
            controller: 'AdminPointInputController'
        })
    .when('/admin/quan-ly-diem', {
            templateUrl: 'views/partials/admin/point_manage.html',
            controller: 'AdminPointManageController'
        })
    .when('/admin/config', {
            templateUrl: 'views/partials/admin/config_edit.html',
            controller: 'AdminConfigController',
        })
    .when('/admin/login', {
            templateUrl: 'views/partials/admin/login.html',
            controller: 'AdminLoginController'
        })

    .when('/404', {
            templateUrl: '/views/404.html',
            title: '404 - Không tìm thấy trang yêu cầu',
            menu: 0
        });
        
        $locationProvider.html5Mode(true);
  
    }]);
