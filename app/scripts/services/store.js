'use strict';

/**
 * @ngdoc service
 * @name clientApp.Store
 * @description
 * # Store
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Store', function ($resource) {
        return $resource('/api/store/:id/:lang', {
            id: '@_id',
            lang: '@lang'
        }, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
