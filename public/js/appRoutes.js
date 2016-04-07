angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home/index.html',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa'
    })
    .when('/ve-chung-toi/:sub_category_slug/:post_slug?', {
      templateUrl: 'views/partials/post/post_detail.html',
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "ve-chung-toi",
      menu: 0
    })
    .when('/chuong-trinh-hoc/:sub_category_slug/:post_slug?', {
      templateUrl: function (params){
        if (params.sub_category_slug == "lich-khai-giang") {
          return 'views/partials/post/lich_khai_giang.html'
        }
        else return 'views/partials/post/chuong_trinh_hoc.html'
      },
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "chuong-trinh-hoc",
      menu: 1
    })
    .when('/thi-quoc-te/:sub_category_slug/:post_slug?', {
      templateUrl: function (params) {
        if (params.sub_category_slug == "lich-thi-quoc-te") {
          return 'views/partials/post/thi_quoc_te/lich_thi_quoc_te.html'
        } else if (params.sub_category_slug == "thu-tuc-va-quy-dinh-du-thi") {
          return 'views/partials/post/thi_quoc_te/thu_tuc_va_qui_dinh_du_thi.html'
        } else {
          return 'views/partials/post/thi_quoc_te/template.html'
        };
      },
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "thi-quoc-te",
      menu: 3
    }).when('/hot-news/:sub_category_slug', {
      templateUrl: function (params) {
        if (params.sub_category_slug == "tin-tuc") {
          return 'views/partials/post/hot_news/index.html'
        } else if (params.sub_category_slug == "thong-bao-hot-news") {
          return 'views/partials/post/hot_news/thong_bao_hot_news.html'
        } else if (params.sub_category_slug == "cau-lac-bo-UTEC" || params.sub_category_slug == "cau-lac-bo-BKDEC") {
          return 'views/partials/post/hot_news/club.html'
        } else if (params.sub_category_slug == "blog") {
          return 'views/partials/post/hot_news/blog.html'
        } else {
          return 'views/partials/post/hot_news/template.html'
        };
      },
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "hot-news",
      menu: 4
    })
    .when('/hot-news/blog/:post_slug', {
      templateUrl:'views/partials/post/hot_news/blog_detail.html',
      controller: 'PostController',
      title: 'Trung Tâm Ngoại Ngữ ĐH Bách Khoa',
      categorySlug: "hot-news",
      menu: 4
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);
