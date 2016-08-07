'use strict';

angular.module('myApp.user', ['ngRoute'])

.service('loginService', function($http) {
	// assumes authenication has passed and user info is returned
    this.getUser = function() {
        return {
			"id":"e7fe026d-49e8-4c21-919c-215369d269bb",
			"firstName": "Stan",
			"lastName": "Winston",
			"avatar": "https://robohash.org/ametverodolore.png?size=60x60&set=set1"
        };
    }
})

.controller('UserController', ['$scope', 'loginService', function($scope, loginService){
	$scope.user = loginService.getUser();

	$scope.getUser = function(){
		return $scope.user;
	};
}]);