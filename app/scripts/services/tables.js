'use strict';

/**
 * @ngdoc service
 * @name clientApp.Tables
 * @description
 * # Tables
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Tables', function ($resource) {
        return $resource('/api/table/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
