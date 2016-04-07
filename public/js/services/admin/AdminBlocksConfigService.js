angular.module('AdminBlocksConfigService', []).factory('AdminBlocksConfig', ['$http', function ($http) {
    
    return {
      loadConfig: function () {
            return $http.post('/api/config/load_blocks_config').then(function (result) {
                return result.data;
            })
        },

        saveConfig: function (config) {
            return $http.post('/api/admin/config/save_blocks', { blocks_config: config }).then(function (result) {
                return result.data;
            })
        }
    };

}]);