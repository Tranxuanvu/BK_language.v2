angular.module('configController', []).controller('ConfigController', function ($scope, $sce, $window, Config, $location, $anchorScroll, $timeout) {
    Config.loadConfig().then(function (config) {
        $scope.config = config;
    });
    
    $scope.redirect = function (uri) {
        $window.location.href = uri;
    }

    $scope.scrollTo = function (id) {
        $timeout( function(){
            $('html,body').animate({
              scrollTop: $(id).offset().top - 110
            }, 600);
        }, 500);
  	}

    $scope.scrollToTop = function () {
        $('html,body').animate({scrollTop: 0}, 600);
    }

    $scope.stopVideo = function(){
        var outerDiv = document.getElementById("video-show");
        var youtubeIframe = outerDiv.getElementsByTagName("iframe")[0].contentWindow;
        youtubeIframe.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
    }

    $scope.closeMenu = function() {
        if($('#t-cssmenu').attr('class') == "m-vertical-menu col-sm-12 show-menu-1") {
            $("html, body").animate({scrollTop: 0}, 100);
            $('.m-caret-right').toggleClass('show-icon');
            $('.m-caret-right').toggleClass('hide');
            $('.m-caret-down').toggleClass('hide');
            $('.m-caret-down').toggleClass('show-icon');
            $('#t-cssmenu').toggleClass('show-menu-1');    
            $('#t-cssmenu').toggleClass('hide-menu');
        }
    }

    $scope.closeMenuMobile = function() {
        if ($('#m-services').attr('class') == "navbar-toggle") {
            $("html, body").animate({scrollTop: 0}, 100);
            $('#m-services').click();
        }
    }
});
