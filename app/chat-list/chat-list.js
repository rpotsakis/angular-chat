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

.controller('ChatListCtrl', ['$scope', '$location', 'chatListService', function($scope, $location, chatListService) {
	$scope.chats = [];

	chatListService.getData().then(function(response) {
        $scope.chats = response.data;
    })
	.catch(function() {
		$scope.error = 'unable to retrieve chat list data';
	});

  $scope.viewItem = function(id) {
    $location.path('chat-details/'+id);
  };
}]);