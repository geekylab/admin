'use strict';

/**
 * @ngdoc service
 * @name clientApp.Orders
 * @description
 * # Orders
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Orders', function ($resource) {
        return $resource('/api/order/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
