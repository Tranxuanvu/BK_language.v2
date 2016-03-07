angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home/index.html',
      controller: 'MainController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      menu: 0
    })
    .when('/ve-chung-toi/:sub_category_slug?/:post_slug?',  {
      templateUrl: 'views/partials/post_detail.html',
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "ve-chung-toi",
      menu: 0
    });
          
  $locationProvider.html5Mode(true);
}]);
