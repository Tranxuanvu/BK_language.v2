angular.module('authenticationController', []).controller('AuthenticationController', function($scope, $rootScope, $route, md5, $window,$cookieStore, Authentication) {

  var user = $cookieStore.get('user') || null;

  $scope.user = {};

  $rootScope.logout = function () {
    $cookieStore.remove('user');
    $window.location.href = '/';
  }

  if(user != null){
    // $window.location.href = '/';
    console.log('user not null');
  }else{
    $scope.login = function () {
      
      $scope.user.passwd = md5.createHash($scope.user.passwd);
      
      Authentication.checkLogIn($scope.user).then(function (data) {
        if(data.length > 0){
          $cookieStore.put('user', data[0]);
          
          $window.location.href = '/';
        }else{
          $scope.user.passwd = '';
          alert('Sai tên đăng nhập hoặc mật khẩu !');
        }
      })
    }
  }
});