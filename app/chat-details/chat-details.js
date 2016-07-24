'use strict';

angular.module('myApp.chatDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/chat-details/:chatId?', {
    templateUrl: 'chat-details/chat-details.html',
    controller: 'ChatDetailsCtrl'
  });
}])

.controller('ChatDetailsCtrl', ['$scope','$routeParams', function($scope, $routeParams) {
  $scope.chatId = $routeParams.chatId
}]);