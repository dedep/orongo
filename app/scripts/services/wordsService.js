'use strict';

angular.module('orongoApp')
  .service('WordsService', function (pouchDB, DBConfig, $rootScope, AuthService) {

    this.scheduleSync = function(remoteUrl) {
      var remote = pouchDB(remoteUrl);
      return AuthService.getLocalDB().sync(remote, {
        live: true,
        retry: true
      }).on('change', function (c) {
        if (c.direction === 'pull') {
          $rootScope.$broadcast('server_pull', c);
        }
      }).on('paused', function () {
        // replication was paused, usually because of a lost connection
      }).on('active', function () {
        // replication was resumed
      }).on('error', function (err) {
        console.error(err);
      });
    };

    this.findAll = function() {
      return AuthService.getLocalDB().allDocs({
        include_docs: true, // jshint ignore:line
        attachments: true
      });
    };

    this.save = function(word) {
      return AuthService.getLocalDB().put(word);
    };
  });
