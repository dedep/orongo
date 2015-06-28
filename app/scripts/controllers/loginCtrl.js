'use strict';

angular.module('orongoApp')
  .controller('LoginCtrl', function ($scope, pouchDB, DBConfig, WordsService, $location) {

    $scope.credentials = {
      user: '',
      password: ''
    };

    $scope.login = function() {
      var DbUrl =  DBConfig.url + $scope.credentials.user.hexEncode();
      var remoteDB = pouchDB(DbUrl);

      remoteDB.login($scope.credentials.user, $scope.credentials.password, function (err) {
        if (err) {
          if (err.name === 'unauthorized') {
            console.log('Incorrect name or password');
            // name or password incorrect
          } else {
            console.log(err);
            // cosmic rays, a meteor, etc.
          }
        } else {
          console.log('logged');
          WordsService.scheduleSync(DbUrl);
          $location.path('/words');
        }
      });
    };
  });
