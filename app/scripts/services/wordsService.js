'use strict';

angular.module('orongoApp')
  .service('WordsService', function (pouchDB, DBConfig, $rootScope) {
    var localDB = pouchDB('orongo3');

    this.scheduleSync = function(url) {
      var remoteDB = pouchDB(url);
      localDB.sync(remoteDB, {
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
      }).on('error', function () {
        // totally unhandled error (shouldn't happen)
      });
    };

    this.findAll = function() {
      return localDB.allDocs({
        include_docs: true, // jshint ignore:line
        attachments: true
      });
    };

    this.save = function(word) {
      return localDB.put(word);
    };
  });
