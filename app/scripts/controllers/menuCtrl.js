'use strict';

angular.module('orongoApp')
  .controller('MenuCtrl', function (AuthService, $scope, $route, ngToast, $location) {
    $scope.isUserLoggedIn = function() {
      return AuthService.anybodyLoggedIn();
    };

    $scope.username = function() {
      return AuthService.getLoggedUser();
    };

    $scope.logout = function() {
      AuthService.logout(function() {
        $scope.$apply(function () {
          ngToast.create('Successfully logged out');
          $location.path('/login');
        });
      });
    };

    $scope.route = $route;
  });
