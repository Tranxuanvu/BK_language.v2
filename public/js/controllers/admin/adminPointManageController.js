angular.module('adminPointManageController', []).controller('AdminPointManageController', function ($scope, $http, $window) {
    var refresh = function(){
        $http.post('/api/admin/classes').success(function (result) {
            $scope.classes = result;
        })
    }
    refresh();

    $scope.delete = function(classInfo){
        if(confirm("Bạn có muốn xóa " + classInfo.class))
            $http.post('/api/admin/deleteClass',{id: classInfo.id}).success(function (result) {
                if(result == "200"){
                    alert("Đã xóa lớp " + classInfo.class);
                    refresh();
                }
            })
    }

    $scope.getStudents = function(classInfo){
        $http.post('/api/admin/students',{id: classInfo.id}).success(function (result) {
            for (var i = $scope.classes.length - 1; i >= 0; i--) {
               if($scope.classes[i].id == classInfo.id)
               {
                    $scope.classes[i].show = true;
                    $scope.classes[i].students = result;
                    break;
               } 
            }
        })
    }

    $scope.hide = function(classInfo){
        for (var i = $scope.classes.length - 1; i >= 0; i--) {
           if($scope.classes[i].id == classInfo.id)
           {
                $scope.classes[i].show = false;
                break;
           } 
        }
    }
}).filter('reverse', function() {
  return function(items) {
    if(items)
      return items.slice().reverse();
    else return [];
  };
});