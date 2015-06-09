'use strict';

angular.module('orongoApp')
  .controller('WordsCtrl', function ($scope, pouchDB, WordsService) {

    $scope.consecutiveSuccessesWins = 5;

    $scope.word = {
      _id: '',
      translation: '',
      consecutiveSuccesses: 0
    };

    $scope.saveWord = function() {
      WordsService.save($scope.word).then(function () {
        console.log('Saved ' + $scope.word._id);
        $scope.words.push($scope.word);
      }).catch(function (err) {
        console.error(err);
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
    }).catch(function(err) {
      console.log('Something failed ' + err);
    });
  });
