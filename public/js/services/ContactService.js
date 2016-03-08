angular.module('ContactService', []).factory('Contact', ['$http', function ($http) {
    return {
		insertCustomer: function(data, callback){
			return $http.post('/api/main/new_customer', data).then(function (result){
				return result.data;
			});
		}
	};
}]);