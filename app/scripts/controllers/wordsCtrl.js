'use strict';

angular.module('orongoApp')
  .controller('WordsCtrl', function ($scope, pouchDB, WordsService, ngToast) {

    $scope.consecutiveSuccessesWins = 5;

    $scope.word = {
      _id: '',
      translation: '',
      consecutiveSuccesses: 0
    };

    $scope.saveWord = function() {
      WordsService.save($scope.word).then(function () {
        ngToast.create('Word ' + $scope.word._id + ' added.');
        $scope.words.push($scope.word);
      }).catch(function () {
        ngToast.danger('Something\'s wrong. Try again.');
      });
    };

    //todo: switch to ui-router
    $scope.selectWord = function() {

    };

    $scope.range = function(n) {
      return new Array(n);
    };

    WordsService.findAll().then(function(result) {
      $scope.words = result.rows.map(function(elem) { return elem.doc; });
    }).catch(function() {
      ngToast.danger('Something\'s wrong. Try again.');
    });
  });
