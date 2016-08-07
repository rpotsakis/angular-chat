'use strict';

angular.module('myApp')

.service('contactListService', function($http) {
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'mockdata/contacts.json'
         });
    }
});