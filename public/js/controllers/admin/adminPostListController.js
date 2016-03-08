angular.module('adminPostListController', []).controller('AdminPostListController', function($scope,$route,$window,$location, $cookieStore, NgTableParams, AdminMain) {

	 var user = $cookieStore.get('user') || null;

    if(user == null){
        $window.location.href = '/admin/login';
    }else{
    	$scope.catalogs = [];
		$scope.datatble = [];
		$scope.authors = [];

		var status_id = $route.current.$$route.status_id;

		$scope.title  = '';
		switch(status_id) {
			case 1:
				$scope.title = '<i class="fa fa-database"></i> Bài đã lưu';
				break;
			case 2:
				$scope.title = '<i class="fa fa-cloud-upload"></i> Chờ xét duyệt';
				break;
			case 3:
				$scope.title = '<i class="fa fa-check-square"></i> Bài đã đăng';
				break;
			case 4:
				$scope.title = '<i class="fa fa-recycle"></i> Bài đã xóa';
				break;		
		}

		$scope.catalogs.push({
			id: '',
			title:'Tất cả'
		});

		$scope.authors.push({
			id: '',
			title:'Tất cả'
		});

		AdminMain.getCatlog().then(function (data) {
			for (var i = 0; i < data.length; i++) {
				$scope.catalogs.push({
					id: data[i].name,
					title: data[i].name
				});
			}
			
		});

		AdminMain.getAuthors().then(function (data) {
			for (var i = 0; i < data.length; i++) {
				$scope.authors.push({
					id: data[i].name,
					title: data[i].name
				});
			}
			
		});

		AdminMain.getPostOnStatus({status_id: status_id, user_id: user.id, role: user.role}).then(function (data) {

			for (var i = 0; i < data.length; i++) {
				data[i].catalog = data[i].category_name + ' - ' + data[i].sub_category_name;
			}	
			$scope.datatble = data;

			$scope.tableParams = new NgTableParams({
				sorting: {id: "asc"}, 
				filter:  {full_name: '', catalog: ''},
				page: 1, // show first page
				count: 20 // count per page
			}, {
				filterDelay: 0,
				data: data
			});

		});
    }
    
});