'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.chatList',
  'myApp.chatDetails'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/chat-list'});
}])
.factory('userFactory', function() {
	return {
		getUser : function(){
			return {
				"id":"e7fe026d-49e8-4c21-919c-215369d269bb",
				"firstName": "Stan",
				"lastName": "Winston",
				"avatar": "https://robohash.org/ametverodolore.png?size=60x60&set=set1"
			};
		}
	};
});