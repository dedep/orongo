'use strict';

angular
  .module('orongoApp', [
    'ngResource',
    'ngRoute',
    'pouchdb',
    'ngToast',
    'uuid4'
  ])
  .run(function(WordsService) {
    WordsService.scheduleSync();
  })
  .constant('DBConfig', {
    url: 'http://192.168.1.10:5984/orongo3'
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
