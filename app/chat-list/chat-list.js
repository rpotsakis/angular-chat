'use strict';

angular.module('myApp.chatList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat-list', {
    templateUrl: 'chat-list/chat-list.html',
    controller: 'ChatListCtrl'
  });
}])

.service('chatListService', function($http) {
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'mockdata/chat-list.json'
         });
    }
})

.service('contactListService', function($http) {
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'mockdata/contacts.json'
         });
    }
})

.controller('ChatListCtrl', [
  '$scope', '$location', '$mdSidenav', 'chatListService', 'contactListService', 
  function($scope, $location, $mdSidenav, chatListService, contactListService) {
	$scope.chats = [];
  $scope.persons = [];

  chatListService.getData().then(function(response) {
    $scope.chats = response.data;
  })
  .catch(function() {
    $scope.error = 'unable to retrieve chat list data';
  });

  $scope.viewItem = function(id) {
    $location.path('chat-details/'+id);
  };

  contactListService.getData().then(function(response) {
        $scope.persons = response.data;
  })
  .catch(function() {
    $scope.error = 'unable to retrieve contact list data';
  });

  $scope.startNewChat = function() {
    $mdSidenav('contact-list').toggle();
  };

}]);