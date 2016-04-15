angular.module('AuthenticationService', []).factory('Authentication', ['$http', function($http) {
  return {
    checkLogIn: function (data) {
      return $http.post('/api/authentication/login', data).then(function (result) {
        return result.data;
      })
    },

    createUser: function (data) {
      return $http.post('api/authentication/register', data).then(function (result) {
        return result.data;
      })
    }
  };
}]);
