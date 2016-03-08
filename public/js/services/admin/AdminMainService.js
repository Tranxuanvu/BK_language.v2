angular.module('AdminMainService', []).factory('AdminMain', ['$http', function($http) {

	return {

		getCatlog: function () {
			return $http.post('/api/admin/catalog').then(function (result) {
				return result.data;
			})
		},
		getStatus: function () {
			return $http.post('/api/admin/status').then(function (result) {
				return result.data;
			})
		},
		getAuthors: function () {
			return $http.post('/api/admin/authors').then(function (result) {
				return result.data;
			})
		},
		getAllPost: function () {
			return $http.post('/api/admin/posts').then(function (result) {
				return result.data;
			})
		},
		getAllCustomer: function () {
			return $http.post('/api/admin/customers').then(function (result) {
				return result.data;
			})
		},
		getPostOnStatus: function (data) {
			return $http.post('/api/admin/sposts', data).then(function (result) {
				return result.data;
			})
		},
		create: function (data) {
			return $http.post('/api/admin/create', data).then(function (result) {
				return result.data;
			})
		},
		checkLogIn: function (data) {
			return $http.post('/api/admin/login', data).then(function (result) {
				return result.data;
			})
		}

	};

}]);