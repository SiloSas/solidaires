angular.module('solidairesApp')
    .controller('sectionCtrl', function ($scope, articlesFactory, $routeParams, $filter) {
        $scope.articles = [];
        articlesFactory.getArticles().then(function (articles) {
            $scope.articles = $filter('filter')(articles, $routeParams.sectionName, 'category');
        });
    });