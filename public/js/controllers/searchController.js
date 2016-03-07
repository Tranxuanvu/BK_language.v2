angular.module('searchController', []).controller('SearchController', function ($scope, $sce, $routeParams, Search) {
    $scope.search = function (patten){
        Search.Search(patten).then(function (results) { 
            $scope.searchResults = results
        });
    }
    
    $scope.searchPatten = $routeParams.patten;

    if ($routeParams.patten) {
        $scope.search($routeParams.patten);
    }
});