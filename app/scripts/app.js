'use strict';

angular
  .module('orongoApp', [
    'ngResource',
    'ngRoute',
    'pouchdb',
    'ngToast',
    'uuid4'
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
        controller: 'WordsCtrl'
      })
      .when('/words/:id', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/words'
      });
  });
