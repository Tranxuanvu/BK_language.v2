var app = angular.module('bklanguage', [
    'ngRoute',
    'appRoutes',
    'appFilters',
    'ngMap',
    'appDirectives',
    'ui.bootstrap',
    'ngCookies',
    'angular-md5',
    'ngToast',

    'mainController',
    'MainService',

    'menuController',
    'MenuService',

    'orthodonticController',
    'OrthodonticService',

    'consultController',
    'ConsultService',

    'reviewController',
    'ReviewService',

    'serviceController',
    'ServiceService',

    'contactController',
    'ContactService',

    'postController',
    'PostService',

    'configController',
    'ConfigService',

    'searchController',
    'SearchService',

    'blocksController',
    'BlocksService',

    'authenticationController',
    'AuthenticationService'
])
.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);

app.run(['$location', '$rootScope', function ($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title || 'BK English';
            $rootScope.menu = current.$$route.menu;
            $rootScope.active = 'active';
        });
    }]);

angular.module('admin', [
    'ngRoute',
    'appAdminRoutes',
    'appFilters',
    'appDirectives',

    'ngFileUpload',
    'ngTable',
    'ngCookies',
    'angular-md5',
    'ngTagsInput',

    'adminMainController',
    'adminCustomerListController',
    'AdminMainService',

    'adminPostListController',
    'adminPostEditController',
    'AdminPostService',

    'adminMenuController',
    'AdminMenuService',

    'adminConfigController',
    'AdminConfigService',

    'adminHomeConfigController',
    'AdminHomeConfigService',

    'adminBlocksConfigController',
    'AdminBlocksConfigService',

    'adminLoginController'
]);
