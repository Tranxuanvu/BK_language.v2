angular.module('adminPostEditController', ['ckeditor']).controller('AdminPostEditController', function ($scope, NgTableParams, $window, $cookieStore, $routeParams, Upload, AdminMain, AdminPost) {
    
    var user = $cookieStore.get('user') || null;
    
    if (user == null) {
        $window.location.href = '/admin/login';
    } else {
        $scope.post = {};
        
        $scope.lbl_btn = 'Cập nhật';
        $scope.title = 'Chỉnh sửa bài viết';
        
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
        
        $scope.links_to_post = document.location.origin + '/';
        AdminPost.getSlugById({ id: $routeParams.id }).then(function (data) {
            $scope.links_to_post += data[0].category_slug + '/' + data[0].sub_category_slug + '/' + data[0].post_slug;
        });
        
        $scope.options = {
            language: 'vi',
            allowedContent: true,
            entities: false
        };
        
        AdminMain.getCatlog().then(function (data) {
            $scope.catalogs = data;

            for (var i = 0; i < data.length; i++) {
                $scope.dcatalogs.push({
                    id: data[i].name,
                    title: data[i].name
                });
            }

            $scope.categoryChange = function () {
                $scope.isReview = $scope.selectedOption.category_id == 5;
            }
        });
        
        AdminMain.getAuthors().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.dauthors.push({
                    id: data[i].name,
                    title: data[i].name
                });
            }

        });
        
        AdminMain.getStatus().then(function (data) {
            $scope.status = data;
            if (user.role == 2) {
                $scope.status.splice(2, 1);
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
        });

        AdminPost.getPostDetail({ post_id: $routeParams.id, author_id: user.id, role: user.role }).then(function (data) {
            if (data.length == 0) {
                $window.location.href = '/';
            } else {
                $scope.post.title = data[0].title;
                $scope.post.image_url = data[0].image_url;
                $scope.post.discription = data[0].discription;
                $scope.htmlEditor = data[0].content;
                $scope.post.date_init = new Date(data[0].date_init);
                $scope.selectedOption = { id: data[0].sub_category_id };
                $scope.selectedStatus = { id: data[0].status_id };
                $scope.post.tags = JSON.parse(data[0].tags);
                $scope.post.on_page = (data[0].on_page == 1) ? true : false;
                $scope.post.cure = data[0].cure;
                $scope.post.facebook_url = data[0].facebook_url;
                $scope.post.googleplus_url = data[0].googleplus_url;

                for (i in $scope.catalogs) {
                    if ($scope.catalogs[i].id == data[0].sub_category_id) {
                        $scope.isReview = $scope.catalogs[i].category_id == 5;
                    }
                }
            }
        });
        
        AdminPost.getPostRelative($routeParams).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                angular.forEach($scope.relative, function (e, k) {
                    if (data[i].redirect_link_id == e.id) {
                        e.isCheck = true;
                        e.topLink = (data[i].top_link == 1) ? true : false;
                    }
                })
            }
            
            $scope.tableParams.reload();
               
        })
        
        $scope.tableParams = new NgTableParams({
            sorting: {
                isCheck: "DESC"
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
        
        
        $scope.options = {
            language: 'vi',
            allowedContent: true,
            entities: false
        };
        
        // Called when the editor is completely ready.
        $scope.onReady = function () {
            // ...
        };
        
        $scope.post.date_init = new Date();
        
        $scope.onUpdateThumb = function ($files) {
            /*$files: an array of files selected, each file has name, size, and type.*/
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                
                Upload.upload({
                    url: '/api/uploads',
                    method: 'POST',
                    withCredentials: true,
                    file: file,
                }).success(function (data, status, headers, config) {
                    /*file is uploaded successfully*/
                    $scope.post.image_url = data;
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
                    file: file,
                }).success(function (data, status, headers, config) {
                    /*file is uploaded successfully*/
                    $scope.htmlEditor += '<img alt="" src="' + data + '" />';
                       
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
            
            $scope.post.id = $routeParams.id;
            
            AdminPost.update($scope.post).then(function (data) {
                // get link to post
                $scope.links_to_post = document.location.origin + '/';
                AdminPost.getCategorySlugById({ sub_category_id: data.sub_category_id }).then(function (data_category_slug) {
                    $scope.links_to_post += data_category_slug[0].slug + '/' + data.post_slug;
                });
                
                alert('Cập nhật viết thành công !');
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
});