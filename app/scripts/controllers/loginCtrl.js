'use strict';

angular.module('orongoApp')
  .controller('LoginCtrl', function ($scope, pouchDB, DBConfig, WordsService, $location, AuthService, ngToast, $rootScope) {

    $scope.credentials = {
      user: '',
      password: ''
    };

    //todo: move it to AuthService
    $scope.login = function() {
      if (!$scope.credentials.user) {
        ngToast.danger('You must provide a username.');
        return;
      }

      var dbUrl = AuthService.getRemoteDBUrl($scope.credentials.user);
      var remoteDB = pouchDB(dbUrl);

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
          AuthService.login($scope.credentials.user);
          $scope.sync = WordsService.scheduleSync(dbUrl);
          $location.path('/words');
          $rootScope.$broadcast('source_changed');
        }

        $scope.credentials.password = '';
      });
    };
  });
