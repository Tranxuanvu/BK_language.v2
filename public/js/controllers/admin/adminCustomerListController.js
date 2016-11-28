angular.module('adminCustomerListController', []).controller('AdminCustomerListController', function($scope, $route, $window, $location, $cookieStore, NgTableParams, AdminMain) {

  var user = $cookieStore.get('user') || null;

  if(user == null){
    $window.location.href = '/login';
  }
  else{
    AdminMain.getAllCustomer().then(function(data){
      $scope.tableParams = new NgTableParams({
        sorting: {
          id: "asc"
        },
        page: 1, // show first page
        count: 20, // count per page
        counts:[]
      }, {
        filterDelay: 0,
        data: data
      });
    });
  }

});