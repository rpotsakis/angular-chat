'use strict';

angular.module('myApp.chatDetails', ['ngRoute'])

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

.controller('ChatDetailsCtrl', ['$scope','$routeParams', '$location', '$mdDialog', 'chatDetailsService', function($scope, $routeParams, $location, $mdDialog, chatListService) {
	$scope.chatId = $routeParams.chatId
	$scope.messages = [];

	chatListService.getData($scope.chatId).then(function(response) {
		$scope.messages = response.data;
	})
	.catch(function() {
		$scope.showAlert();
		$scope.error = 'unable to retrieve chat details data';
	});

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

}]);
