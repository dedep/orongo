'use strict';

angular.module('orongoApp')
  .controller('WordsCtrl', function ($scope, pouchDB, WordsService, ngToast, uuid4) {

    $scope.consecutiveSuccessesWins = 5;

    $scope.word = {
      value: '',
      translation: '',
      consecutiveSuccesses: 0
    };

    $scope.$on('server_pull', function(e, w) {
      var changedDocs = w.change.docs;
      _.each(changedDocs, function(doc) {
        $scope.words = _.reject($scope.words, function(word) { return word._id === doc._id; });

        if (!doc._deleted) {
          console.log('pulling word from server');
          $scope.words.push(doc);
        }
      });
    });

    var updateWords = function() {
      WordsService.findAll().then(function(result) {
        console.log('words');
        console.log(result);
        $scope.words = result.rows.map(function(elem) { return elem.doc; });
      }).catch(function(e) {
        console.error(e);
        ngToast.danger('Something\'s wrong. Try again.');
      });
    };

    $scope.$on('source_changed', function () {
      $scope.$apply(function () {
        updateWords();
      });
    });

    $scope.saveWord = function() {
      $scope.word._id = uuid4.generate();

      WordsService.save($scope.word).then(function () {
        $scope.words.push(_.clone($scope.word));
        ngToast.create('Word ' + $scope.word.value + ' added.');
      }).catch(function (e) {
        console.log(e);
        ngToast.danger('Something\'s wrong. Try again.');
      });
    };

    //todo: switch to ui-router
    $scope.selectWord = function() {

    };

    $scope.range = function(n) {
      return new Array(n);
    };

    updateWords();
  });
