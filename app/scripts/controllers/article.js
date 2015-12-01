angular.module('solidairesApp')
    .controller('articleCtrl', function ($scope, $routeParams, $rootScope, articlesFactory) {
        $scope.articles = [];
        articlesFactory.getArticles().then(function (articles) {
            $scope.articles = articles;
            for (var i = 0; i < $scope.articles.length; i++) {
                if ($scope.articles[i].url == $routeParams.url) {
                    $scope.article = $scope.articles[i];
                    console.log($scope.article)
                }
            }
        });
    });