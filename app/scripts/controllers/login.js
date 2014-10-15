'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('LoginCtrl', function ($scope, $http, BasicAuth) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function (credentials) {
            BasicAuth.setCredentials(credentials.username, credentials.password);
            $http({
                method: 'POST',
                url: 'http://menu-api.geekylab.net:8080/oauth',
                data: {
                    grant_type: 'client_credentials'
                }
            }).success(function (data, status, headers, config) {
                alert(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
                alert('error');
            });


        };

    });
