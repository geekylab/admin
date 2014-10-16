'use strict';

/**
 * @ngdoc service
 * @name clientApp.Items
 * @description
 * # Items
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Items', function ($resource) {
        return $resource('/api/item/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
