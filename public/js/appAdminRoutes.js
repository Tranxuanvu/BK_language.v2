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
    .when('/admin/khach-hang', {
            templateUrl: 'views/partials/admin/list_customer.html',
            controller: 'AdminCustomerListController',
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
    .when('/admin/config', {
            templateUrl: 'views/partials/admin/config_edit.html',
            controller: 'AdminConfigController',
        })
    .when('/admin/login', {
            controller: 'AdminLoginController'
        })

    .when('/404', {
            templateUrl: '/views/404.html',
            title: '404 - Không tìm thấy trang yêu cầu',
            menu: 0
        });
        
        $locationProvider.html5Mode(true);
  
    }]);
