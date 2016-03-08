angular.module('AdminCategoryService', []).factory('AdminCategory', ['$http', function ($http) {
        return {
            loadCategories: function () {
                return $http.post('/api/admin/categories').then(function (result) {
                    return result.data;
                })
            },
            loadSubcategories: function (categoryId){
                return $http.post('/api/admin/subcategories', { category_id: categoryId }).then(function (result) {
                    return result.data;
                })
            },
            updateCategory: function (adds, updates, deletes){
                return $http.post('/api/admin/update_category', {adds: adds, updates: updates, deletes: deletes}).then(function (result) {
                    return result.data;
                })
            },
            updateSubCategory: function (adds, updates, deletes, id) {
                return $http.post('/api/admin/update_subcategory', { adds: adds, updates: updates, deletes: deletes , id: id}).then(function (result) {
                    return result.data;
                })
            },
        };
    }]);