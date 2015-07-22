'use strict';

angular.module('orongoApp')
  .controller('LoginCtrl', function ($scope, pouchDB, DBConfig, WordsService, $location, AuthService, ngToast) {

    $scope.credentials = {
      user: '',
      password: ''
    };

    $scope.login = function() {
      if (!$scope.credentials.user) {
        ngToast.danger('You must provide a username.');
        return;
      }

      var DbUrl =  DBConfig.url + $scope.credentials.user.hexEncode();
      var remoteDB = pouchDB(DbUrl);

      remoteDB.login($scope.credentials.user, $scope.credentials.password, function (err) {
        if (err) {
          console.log(err);
          if (err.status === 401) {
            $scope.$apply(function() {
              ngToast.danger('Name or password is incorrect.');
          });
          } else if (err.status === 500) {
            $scope.$apply(function() {
              ngToast.danger('Connection error.');
            });
          } else if (err.status === 400) {
            $scope.$apply(function() {
              ngToast.danger('You must provide a password.');
            });
          }
        } else {
          $scope.sync = WordsService.scheduleSync(DbUrl);
          AuthService.login($scope.credentials.user);
          $location.path('/words');
        }

        $scope.credentials.password = '';
      });
    };
  });
