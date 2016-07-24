'use strict';

angular.module('myApp.chatList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat-list', {
    templateUrl: 'chat-list/chat-list.html',
    controller: 'ChatListCtrl'
  });
}])

.controller('ChatListCtrl', [function() {

}]);