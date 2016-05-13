angular.module('authenticationController', []).filter('split', function() {
  return function(input, splitChar, splitIndex) {
    return input.split(splitChar)[splitIndex];
  }
})
.controller('AuthenticationController', function($scope, $rootScope, $route, md5, $window,$cookieStore, Authentication, ngToast) {

  var user = $cookieStore.get('user') || null;

  $scope.user = {};
  $scope.currentUser = null;

  $rootScope.logout = function () {
    $cookieStore.remove('user');
    $window.location.href = '/';
  }

  if(user != null){
    $scope.currentUser = user.email;
  } else {
    $scope.login = function () {
      
      $scope.user.password = md5.createHash($scope.user.password);
      
      Authentication.checkLogIn($scope.user).then(function (data) {
        if(data.length > 0){
          $cookieStore.put('user', data[0]);
          
          $window.location.href = '/';
        }else{
          $scope.user.password = '';
          ngToast.create('Sai tên đăng nhập hoặc mật khẩu !');
        }
      })
    }

    $scope.register = function(user) {
      if (user.password != user.rePassword) {
        user.password = '';
        user.rePassword = '';
        ngToast.create('Mật khẩu không khớp, vui lòng nhập lại!');
      }
      else {
        user.password = md5.createHash(user.password);
        Authentication.createUser(user).then(function (result) {
          if (result == 1) {
            ngToast.create('Email đã được đăng ký. Vui lòng nhập email khác hoặc chuyển qua Đăng nhập!');
          }

          if (result == 4) {
            ngToast.create('Tạo tài khoản thành công! Chọn tab Đăng Nhập để đăng nhập !');
          }
        })
      }
    }
  }

});
