angular.module('AdminPostService', []).factory('AdminPost', ['$http', function($http) {

	return {

		getPostDetail: function (data) {
			return $http.post('/api/admin/postdetail', data).then(function (result) {
				return result.data;
			})
		},

		getPostRelative: function (data) {
			return $http.post('/api/admin/postrelavtive', data).then(function (result) {
				return result.data;
			})
		},

		getCategorySlugById: function (data) {
			return $http.post('/api/admin/sub_category_slug', data).then(function (result) {
				return result.data;
			})
		},

		getSlugById: function (data) {
			return $http.post('/api/admin/slug', data).then(function (result) {
				return result.data;
			})
		},

		update: function (data) {
			return $http.post('/api/admin/update', data).then(function (result) {
				return result.data;
			})
		}

	};

}]);