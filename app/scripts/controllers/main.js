'use strict';

/**
 * @ngdoc function
 * @name solidairesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the solidairesApp
 */
angular.module('solidairesApp')
  .controller('MainCtrl', function ($scope, articlesFactory, $filter) {
        $scope.unes = [];
        $scope.limit = 8;
        articlesFactory.getArticles().then(function (articles) {
            $scope.unes = $filter('filter')(articles, 'une', 'category');
        });

  });
