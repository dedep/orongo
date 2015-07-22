'use strict';

angular.module('orongoApp')
  .controller('MenuCtrl', function (AuthService, $scope, $route) {
    $scope.isUserLoggedIn = function() {
      return AuthService.anybodyLoggedIn();
    };

    $scope.username = function() {
      return AuthService.getLoggedUser();
    };

    $scope.logout = function() {
      AuthService.logout();
    };

    $scope.route = $route;
  });
