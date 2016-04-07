angular.module('postController', []).controller('PostController', function ($scope, $sce, $window, $route, $routeParams, Post) {
    $scope.fb = {like_count:0, comment_count: 0, view_count: 324};
    
    var categorySlug = $scope.categorySlug = $route.current.categorySlug == null ? $routeParams.categorySlug : $route.current.categorySlug;
    var subCagotorySlug = $routeParams.sub_category_slug;
    var postSlug = $routeParams.post_slug;
    
    Post.getSubCategoryList(categorySlug).then(function (data) {

        $scope.subCategories = data;

        if (data.length > 0) {
            if (subCagotorySlug == null) {
                subCagotorySlug = data[0].slug;
            }
            
            if (data[0].posts.length > 0 && postSlug == null) {
                postSlug = data[0].posts[0].slug;
            }
        }
        
        Post.getPost(categorySlug, subCagotorySlug, postSlug).then(function (post) {
            if (post.length == 1) {
                $scope.post = post[0];
            }

            if (post.length > 1) {
                $scope.post = post;

                // add link of post to array $scope.post
                $scope.list_link_to_post = [];
                for (i in post){
                    if (i != 'tags') {
                        $scope.post[i].link_to_post = document.location.origin + '/' + post[i].category_slug + '/' + post[i].sub_category_slug + '/' + post[i].slug;
                    }
                }
            }
            // post.tags = post.tags != null ? JSON.parse(post.tags):[];
            
            
            Post.getRelative(post.id).then(function (relativePosts) {
                $scope.relativePosts = relativePosts;
                
                var article_links = [];
                for (i in relativePosts) {
                    if (relativePosts[i].top_link == 1) {
                        article_links.push(relativePosts[i]);
                    }
                }
                $scope.article_links = article_links;

                for (j in relativePosts){
                	/*var jqxhr = $.getJSON('https://api.facebook.com/method/links.getStats?urls='+encodeURIComponent($window.location.href)+'&format=json');
		            jqxhr.done(function(data) {
		                $scope.fb.like_count = data[0].like_count;
		                $scope.fb.comment_count = data[0].comment_count;
		            });*/
                }

                for (k in relativePosts){
                	/*var jqxhr = $.getJSON('https://api.facebook.com/method/links.getStats?urls='+encodeURIComponent($window.location.origin + '/' + relativePosts)+'&format=json');
		            jqxhr.done(function(data) {
		                $scope.fb.like_count = data[0].like_count;
		                $scope.fb.comment_count = data[0].comment_count;
		            });*/
                }
            });
            
     //        Post.getListPostTags(post.tags).then(function (posts) {
     //            $scope.consultPosts = posts;

     //            for (i in relativePosts){
					// var jqxhr = $.getJSON('https://api.facebook.com/method/links.getStats?urls='+encodeURIComponent($window.location.href)+'&format=json');
					// jqxhr.done(function(data) {
					//                 $scope.fb.like_count = data[0].like_count;
					//                 $scope.fb.comment_count = data[0].comment_count;
					// });
     //            }
     //        });

            //get facebook info
            // var jqxhr = $.getJSON('https://api.facebook.com/method/links.getStats?urls='+encodeURIComponent($window.location.href)+'&format=json');
            // jqxhr.done(function(data) {
            //     $scope.fb.like_count = data[0].like_count;
            //     $scope.fb.comment_count = data[0].comment_count;
            // });
        });
    });
}); 