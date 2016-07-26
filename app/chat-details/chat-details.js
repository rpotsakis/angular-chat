'use strict';

angular.module('myApp.chatDetails', ['ngRoute','ngSanitize'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/chat-details/:chatId?', {
    templateUrl: 'chat-details/chat-details.html',
    controller: 'ChatDetailsCtrl'
  });
}])

.service('chatDetailsService', function($http) {
    this.getData = function(chatId) {
        return $http({
            method: 'GET',
            url: 'mockdata/messages/'+ chatId +'.json'
         });
    }
})

.controller('ChatDetailsCtrl', ['$scope','$routeParams', '$location', '$mdDialog', '$sce', 'chatDetailsService', 'userFactory', 'messageFactory', function($scope, $routeParams, $location, $mdDialog, $sce, chatListService, userFactory, messageFactory) {
	$scope.chatId = $routeParams.chatId
	$scope.messages = [];
	$scope.user = userFactory.getUser();

	chatListService.getData($scope.chatId).then(function(response) {
		$scope.messages = $scope.sanitizeData(response.data);
	})
	.catch(function() {
		$scope.showAlert();
		$scope.error = 'unable to retrieve chat details data';
	});

	$scope.sanitizeData = function(data) {
		for(var i in data) {
			if(data[i].image) {
				data[i].body = messageFactory.createImgTag(data[i].image, 250);
			} else {
				data[i].body = messageFactory.replaceEmoticons(data[i].body);
			}
		}

		return data;
	};

	$scope.trustMessageBody = function(body){
		return $sce.trustAsHtml(body);
	};

	$scope.showAlert = function() {
		$mdDialog.show(
		  $mdDialog.alert()
			.parent(angular.element(document.querySelector('.myapp-message-list')))
			.clickOutsideToClose(true)
			.title('Service Error')
			.textContent("Sorry! We're having trouble getting your chat details. Please try again later.")
			.ok('Got it!')
		);
	};

	$scope.addMessage = function() {
		var message = {
			id: "",
			body: $scope.sendMessageVal,
			sender: {
				id: $scope.user.id,
				firstName: $scope.user.firstName,
				lastName: $scope.user.lastName,
				avatar: $scope.user.avatar
			},
			createdDate: messageFactory.makeCreatedDate(),
			createdTime: messageFactory.makeCreatedTime()
		};
		$scope.messages.push(message);
	}

}])

.directive('messageSent', function() {
	return {
		restrict: 'E',
		templateUrl: 'chat-details/chat-message-sent.html'
	};
})

.directive('messageRecieved', function() {
	return {
		restrict: 'E',
		templateUrl: 'chat-details/chat-message-recieved.html'
	};
});
