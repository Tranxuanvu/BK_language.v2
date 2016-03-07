angular.module('ReviewService', []).factory('Review', ['$http', function ($http) {
        return {
            getSubCategoryList: function (categorySlug) {
                return $http.post('/api/post/getlistpostbycategory', { category: categorySlug}).then(function (result) {
                    return result.data;
                });
            }
        };
}]);