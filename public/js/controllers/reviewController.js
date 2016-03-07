angular.module('reviewController', []).controller('ReviewController', function ($scope, $sce, $route, Review) {
    var categorySlug = $route.current.categorySlug == null ? $routeParams.categorySlug : $route.current.categorySlug;

    Review.getSubCategoryList(categorySlug).then(function (data) {
        $scope.reviewCategories = data;
        $scope.allReviews = [];
        $scope.categorySelectedIdx = -1;
        
        for (i in data) {
            $scope.allReviews = $scope.allReviews.concat(data[i].posts);
        }
        
        $scope.reviews = $scope.allReviews;
    });
    
    $scope.onChangeCategory = function (subCategoryIdx) {
        $scope.categorySelectedIdx = subCategoryIdx;
        
        if (subCategoryIdx == -1) {
            $scope.reviews = $scope.allReviews;
        } else {
            $scope.reviews = $scope.reviewCategories[subCategoryIdx].posts;
        }

    }
});