'use strict';

/**
 * @ngdoc function
 * @name solidairesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the solidairesApp
 */
angular.module('solidairesApp')
  .controller('searchCtrl', function ($scope, $rootScope, $location, articlesFactory) {
        $rootScope.articles = [];
        articlesFactory.getArticles().then(function (articles) {
            articles = articles.filter(function (article) {
                if (article.category.indexOf('news') == -1) {
                    return article
                }
            });
            $rootScope.articles = articles
            //$rootScope.showPub = true;
        });
        /*search ctrl*/
        $scope.search = function (searchPattern) {
            $rootScope.research = searchPattern;
            $location.path('/');
            console.log($rootScope.research)
        };
        $rootScope.research = '';
  });
