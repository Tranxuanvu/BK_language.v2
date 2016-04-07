angular.module('adminMainController', ['ckeditor']).controller('AdminMainController', function ($http, $scope, $rootScope, $cookieStore, Upload, $window, NgTableParams, AdminMain) {
    
    var user = $cookieStore.get('user') || null;
    
    $rootScope.base_url = document.location.origin;
    
    $rootScope.logout = function () {
        $cookieStore.remove('user');
        $window.location.href = '/admin/login';
    }
    
    if (user == null) {
        $window.location.href = '/admin/login';

    }
    else {
        $rootScope.full_name = user.full_name;
        $rootScope.role = user.role;
        $scope.post = {};
        
        $scope.lbl_btn = 'Đăng bài';
        $scope.title = 'Tạo bài viết mới';
        $scope.links_to_post = '';
        
        $scope.options = {
            language: 'vi',
            allowedContent: true,
            entities: false
        };
        
        $scope.post.tags = [];
        
        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
        };
        
        $scope.post.date_init = new Date();
        
        AdminMain.getCatlog().then(function (data) {
            $scope.catalogs = data;
            $scope.selectedOption = {
                id: 1
            };
            
            for (var i = 0; i < data.length; i++) {
                $scope.dcatalogs.push({
                    id: data[i].name,
                    title: data[i].name,
                });
            }
            
            $scope.categoryChange = function () {
                $scope.isReview = $scope.selectedOption.category_id == 5;
            }
        });
        
        AdminMain.getStatus().then(function (data) {
            $scope.status = data;
            if (user.role == 2) {
                $scope.status.splice(2, 1);
            }
            $scope.selectedStatus = {
                id: 1
            };
        });
        
        $scope.relative = [];
        $scope.dcatalogs = [];
        $scope.dauthors = [];
        
        $scope.dcatalogs.push({
            id: '',
            title: 'Tất cả'
        });
        
        $scope.dauthors.push({
            id: '',
            title: 'Tất cả'
        });
        
        AdminMain.getAuthors().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.dauthors.push({
                    id: data[i].name,
                    title: data[i].name
                });
            }

        });
        
        AdminMain.getAllPost().then(function (data) {
            angular.forEach(data, function (e) {
                $scope.relative.push({
                    id: e.id,
                    isCheck: false,
                    topLink: false,
                    title: e.title,
                    catalog: e.category_name + ' - ' + e.sub_category_name,
                    author: e.full_name,
                    dateInit: e.date_init
                });
            });
            
            $scope.tableParams = new NgTableParams({
                sorting: {
                    id: "asc"
                },
                filter: {
                    author: '',
                    catalog: ''
                },
                page: 1, // show first page
                count: 10 // count per page
            }, {
                filterDelay: 0,
                data: $scope.relative
            });
        })
        
        $scope.onUpdateThumb = function ($files) {
            /*$files: an array of files selected, each file has name, size, and type.*/
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                Upload.upload({
                    url: '/api/uploads',
                    method: 'POST',
                    withCredentials: true,
                    data: { file: file }
                }).then(function (resp) {
                    /*file is uploaded successfully*/
                    $scope.post.image_url = resp.data;
                });
            }
        };
        
        $scope.onAddImages = function ($files) {
            /*$files: an array of files selected, each file has name, size, and type.*/
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                Upload.upload({
                    url: '/api/uploads',
                    method: 'POST',
                    withCredentials: true,
                    data: { file: file }
                }).then(function (resp) {
                    /*file is uploaded successfully*/
                    $files = [];
                    $scope.htmlEditor += '<img alt="" src="' + resp.data + '" />';
                });
            }
        };
        
        $scope.create = function () {
            // Chua phan quyen -> set default admin = 1
            $scope.post.author_id = user.id;
            
            $scope.post.content = $scope.htmlEditor || '';
            $scope.post.slug = friendlyUrl($scope.post.title);
            $scope.post.sub_category_id = $scope.selectedOption.id;
            $scope.post.links = [];
            $scope.post.status_id = $scope.selectedStatus.id;
            $scope.post.facebook_url = $scope.post.facebook_url || '';
            $scope.post.googleplus_url = $scope.post.googleplus_url || '';
            $scope.post.cure = $scope.post.cure || '';
            
            angular.forEach($scope.relative, function (e) {
                if (e.isCheck) {
                    $scope.post.links.push({
                        redirect_link_id: e.id,
                        top_link: e.topLink
                    });
                }
            });
            
            AdminMain.create($scope.post).then(function (data) {
                $scope.post = {};
                $scope.htmlEditor = '';
                $scope.post.date_init = new Date();
                $scope.htmlEditor = '';
                
                alert('Tạo bài viết thành công !');
                
                $window.location.href = '/admin/edits/' + data.post_id;
            });
        }
        
        function friendlyUrl(item) {
            if (item) {
                var str = item.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
                str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
                str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
                str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
                str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
                str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
                str = str.replace(/(đ)/g, 'd');
                str = str.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
                str = str.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
                str = str.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
                str = str.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
                str = str.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
                str = str.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
                str = str.replace(/(Đ)/g, 'D');
                str = str.replace(/[^A-Za-z0-9 ]/, '');
                str = str.replace(/\s+/g, ' ');
                str = str.trim();
                str = str.toLowerCase();
                str = str.replace(/\s/g, '-');
                return str;
            }
        };
    }
    
    // replace &nbsp; char to space char in post title
    $scope.nbspReplaceInTitle = function (str) {
        var replaceStr = new RegExp(String.fromCharCode(160), "g");
        $scope.post.title = str.replace(replaceStr, " ");
    }
    
    // replace &nbsp; char to space char in post description
    $scope.nbspReplaceInDesc = function (str) {
        var replaceStr = new RegExp(String.fromCharCode(160), "g");
        $scope.post.discription = str.replace(replaceStr, " ");
    }
});
