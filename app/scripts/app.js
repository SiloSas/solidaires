'use strict';

/**
 * @ngdoc overview
 * @name solidairesApp
 * @description
 * # solidairesApp
 *
 * Main module of the application.
 */
angular
  .module('solidairesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'mm.foundation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/article/:url', {
        templateUrl: 'views/article.html',
        controller: 'articleCtrl'
      })
      .when('/rubrique/:sectionName', {
        templateUrl: 'views/section.html',
        controller: 'sectionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
