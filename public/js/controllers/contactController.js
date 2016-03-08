angular.module('contactController', []).controller('ContactController', function($scope, $sce, Contact) {
	$scope.register = function(){
	    var activePhoneNumber = false,
	        phoneNumber = $scope.info.phone;

	    if((phoneNumber.length == 10 && phoneNumber.substr(0, 2) == '09') || (phoneNumber.length == 11 && phoneNumber.substr(0, 2) == '01'))
	      activePhoneNumber = true;

	    if(activePhoneNumber){
	      Contact.insertCustomer($scope.info).then(function(){
	        // alert message
	        alert('Đăng kí thành công');

	        // clear old data
	        $scope.info.name = $scope.info.phone = $scope.info.email = $scope.info.status = $scope.info.wish = '';
	      });
	    }
	    else
	      $('#myModal').modal();
  	};
});