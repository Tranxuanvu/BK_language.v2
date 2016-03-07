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
    }).directive('wrapOwlcarousel', function () {  
        return {  
            restrict: 'E',
            link: function (scope, element, attrs) {  
                var options = scope.$eval($(element).attr('data-options'));  
                $(element).owlCarousel(options);  
            }  
        };  
    });