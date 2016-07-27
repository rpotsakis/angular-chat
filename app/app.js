'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.chatList',
  'myApp.chatDetails'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
})

.factory('messageFactory', function() {
	return {
		replaceEmoticons: function(text) {
			text = text || '';
			var parsed = text,
				// would be better as separate json data
				emoticons = { 
					':angry:':'assets/emoticons/angry.png',
					':disappointed:':'assets/emoticons/disappointed.png',
					':joy:':'assets/emoticons/joy.png',
					':laughing:':'assets/emoticons/laughing.png',
					':smile:':'assets/emoticons/smile.png'
				};
			
			for (var key in emoticons) {
				parsed = parsed.replace(key, this.createImgTag(emoticons[key]));
			}

			return parsed;
		},
		createImgTag: function(src, width, units) {
			width = width || 16;
			units = units || 'px';
			return '<img src="' + src + '" style="width: ' + width + units + ';" />';
		},
		makeCreatedDate: function() {
			var currentDate =  new Date();
			return currentDate.getDate() + '/' + currentDate.getDay() + '/' + currentDate.getFullYear();
		},
		makeCreatedTime: function() {
			var currentDate =  new Date(),
				hours = currentDate.getHours(),
				minutes = currentDate.getMinutes(),
				displayHour = (hours > 12) ? (hours - 12) : hours,
				displayMinute = (minutes < 10) ? '0' + minutes : minutes,
				displayEnd = (hours >= 12) ? 'PM' : 'AM';
			return displayHour + ':' + displayMinute + ' ' + displayEnd;
		}
	};
});