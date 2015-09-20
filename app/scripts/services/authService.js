'use strict';

angular.module('orongoApp')
  .service('AuthService', function (localStorageService, pouchDB, $rootScope, ngToast, $location, DBConfig) {

    var setUser = function(user) {
      localStorageService.set('user', user);
    };

    this.login = function(user) {
      setUser(user);
    };

    this.getDBUrl = function(userName) {
      return DBConfig.url + userName.hexEncode();
    };

    this.getRemoteDBUrl = function (userName) {
      var user = userName || this.getLoggedUser();
      if (!user) {
        return undefined;
      }

      return this.getDBUrl(user);
    };

    this.getLocalDB = function() {
      var url;
      if (this.anybodyLoggedIn()) {
        url = this.getLoggedUser();
      } else {
        url = DBConfig.defaultLocalDB;
      }

      return pouchDB(url);
    };

    this.logout = function(callback) {
      pouchDB(this.getRemoteDBUrl()).logout(function() {
        //todo: handle errors
        setUser(undefined);
        $rootScope.$broadcast('source_changed');
        callback();
      });
    };

    this.anybodyLoggedIn = function() {
      return localStorageService.get('user') !== undefined && localStorageService.get('user') !== null;
    };

    this.getLoggedUser = function() {
      return localStorageService.get('user');
    };
  });
