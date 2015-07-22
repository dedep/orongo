'use strict';

angular
  .module('orongoApp', [
    'ngResource',
    'ngRoute',
    'pouchdb',
    'uuid4',
    'LocalStorageModule',
    'ngToast'
  ])
  .run(function() {
    String.prototype.hexEncode = function() {
      var r='';
      var i=0;
      var h;
      while(i<this.length){
        h=this.charCodeAt(i++).toString(16);
        while(h.length<2){
          h=h;
        }
        r+=h;
      }
      return r;
    };
  })
  .constant('DBConfig', {
    url: 'http://192.168.1.10:5984/userdb-'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/words', {
        templateUrl: 'views/words.html',
        controller: 'WordsCtrl',
        activetab: 'words'
      })
      .when('/words/:id', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        activetab: 'login'
      })
      .otherwise({
        redirectTo: '/words'
      });
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('orongo');
  });
