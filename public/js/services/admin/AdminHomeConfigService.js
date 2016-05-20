angular.module('AdminHomeConfigService', []).factory('AdminHomeConfig', ['$http', function ($http) {
		
		return {
			loadConfig: function () {
                return $http.post('/api/config/load_home_config').then(function (result) {
                    console.log(result.data)
                    return result.data;
                })
            },

            saveConfig: function (config) {
                return $http.post('/api/admin/config/save_home', { home_config: config }).then(function (result) {
                    return result.data;
                })
            },

            loadReview: function (id){
                return $http.post('/api/admin/postfulldetail', {post_id: id}).then(function (result) {
                    return result.data;
                })
            }
		};

	}]);