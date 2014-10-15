'use strict';

/**
 * @ngdoc service
 * @name clientApp.BasicAuth
 * @description
 * # BasicAuth
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('BasicAuth', function ($base64, $cookieStore, $http) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');
        return {
            setCredentials: function (username, password) {
                var encoded = $base64.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                $cookieStore.put('authdata', encoded);
            },
            clearCredentials: function () {
                document.execCommand('ClearAuthenticationCache');
                $cookieStore.remove('authdata');
                $http.defaults.headers.common.Authorization = 'Basic ';
            }
        };
    });
