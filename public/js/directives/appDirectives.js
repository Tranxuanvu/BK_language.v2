angular.module('appDirectives', []).directive('ckEditor', [function () {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ngModel) {
                var ck = CKEDITOR.replace(elm[0]);
                
                ck.on('pasteState', function () {
                    $scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                });
                
                ngModel.$render = function (value) {
                    ck.setData(ngModel.$modelValue);
                };
            }
        };
    }]).directive('compile', function ($compile) {
        // directive factory creates a link function
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
              function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);
                    
                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }).directive('imgTitleCenter', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $timeout(function(){
                    var img = element.find('.article-detail-content img');
                    img.parent().next().css({'text-align': 'center', 'font-size': 13});
                }, 100);
            }
        };
    }).directive('showTab', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }).directive("wrapOwlcarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function(element) {
                  // provide any default options you want
                    var defaultOptions = {
                    };
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for(var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    }).directive('owlCarouselItem', function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
              // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }).directive("onToggleHover", function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.bind('mouseenter', function() {
                    element.children(0).addClass("active-home");
                    element.children(1).addClass("display-block");
                });

                element.bind('mouseleave', function() {
                    element.children(0).removeClass("active-home");
                    element.children(1).removeClass("display-block");
                });

                element.children().bind('click', function() {
                    // element.addClass("active-home");
                    element.children(1).removeClass("display-block");
                });
            }
        }
    }).directive('viewportChecker', function() {
        return {
            link: function(scope, element, attr) {

                $(window).load(function() {
                    switch (attr.id) {
                        case "ani-reason" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated bounceInDown',
                            offset: 130
                        })
                        case "ani-block-1" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInLeftBig',
                            offset: 150
                        })
                        case "ani-block-2" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInDownBig',
                            offset: 150
                        })
                        case "ani-block-3" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInRightBig',
                            offset: 150
                        })
                        case "ani-block-4" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInLeftBig',
                            offset: 180
                        })
                        case "ani-block-5" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInUpBig',
                            offset: 180
                        })
                        case "ani-block-6" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated fadeInRightBig',
                            offset: 180
                        })
                        case "ani-sprogram" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated bounceInDown',
                            offset: 190
                        })
                        // case "ani-tab" : element.addClass("hidden_class").viewportChecker({
                        //     classToAdd: 'visible animated zoomInUp',
                        //     offset: 250
                        // })
                        case "ani-teacher" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated bounceInDown',
                            offset: 190
                        })
                        case "teacher-box-model" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated flipInY',
                            offset: 300
                        })
                        case "ani-cmt" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated slideInLeft',
                            offset: 300
                        })
                        case "ani-blog-1" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                        case "ani-blog-2" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                        case "ani-blog-3" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                        case "ani-blog-4" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                        case "ani-blog-5" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                        case "ani-blog-6" : element.addClass("hidden_class").viewportChecker({
                            classToAdd: 'visible animated rollIn',
                            offset: 310
                        })
                    };
                });
            }
        };
    });
