angular.module('PostService', []).factory('Post', ['$http', function ($http) {
        return {
            getPost: function (category, subCategory, slug) {
                return $http.post('/api/post/detail', {category: category, subCategory: subCategory, slug: slug}).then(function (result) {
                    return result.data;
                });
            },

            getSubCategoryList: function (categorySlug){
                return $http.post('/api/post/getlistpostbycategory', { category: categorySlug }).then(function (result) {
                    return result.data;
                });
            },

            getRelative: function (post_id){
                return $http.post('/api/post/relative', {post_id: post_id}).then(function (result) {
                    return result.data;
                });
            },

            getListPostTags: function (tags) {
                return $http.post('/api/post/getlistposttags', {tags : tags}).then(function (result) {
                    return result.data;
                })
            }
        };
    }]);