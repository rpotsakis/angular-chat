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
		createImgTag: function(src, width) {
			width = width || 16;
			return '<img src="' + src + '" style="width: ' + width + 'px;" />';
		}
	};
});