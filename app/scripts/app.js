'use strict';

angular
  .module('orongoApp', [
    'ngResource',
    'ngRoute',
    'pouchdb',
    'ngToast'
  ])
  .run(function(WordsService) {
    WordsService.scheduleSync();
  })
  .constant('DBConfig', {
    url: 'http://localhost:5984/orongo2'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/words', {
        templateUrl: 'views/words.html',
        controller: 'WordsCtrl'
      })
      .when('/words/:id', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })
      .otherwise({
        redirectTo: '/words'
      });
  });
