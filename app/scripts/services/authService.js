'use strict';

angular.module('orongoApp')
  .service('AuthService', function (localStorageService) {

    var setUser = function(user) {
      localStorageService.set('user', user);
    };

    this.login = function(user) {
      setUser(user);
    };

    this.logout = function() {
      setUser(undefined);
    };

    this.anybodyLoggedIn = function() {
      return localStorageService.get('user') !== undefined && localStorageService.get('user') !== null;
    };

    this.getLoggedUser = function() {
      return localStorageService.get('user');
    };
  });
