'use strict';

angular.module('orongoApp')
  .service('WordsService', function (pouchDB, DBConfig) {

    var localDB = pouchDB('orongo2');
    var remoteDB = pouchDB(DBConfig.url);

    this.scheduleSync = function() {
      localDB.sync(remoteDB, {
        live: true,
        retry: true
      }).on('change', function () {
        //findAll();
      }).on('paused', function () {
        console.log('paused');
        // replication was paused, usually because of a lost connection
      }).on('active', function () {
        console.log('active');
        // replication was resumed
      }).on('error', function () {
        console.log('err');
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
