angular.module('AuthenticationService', []).factory('Authentication', ['$http', function($http) {
  return {
    checkLogIn: function (data) {
      return $http.post('/api/authentication/login', data).then(function (result) {
        return result.data;
      })
    }
  };
}]);
