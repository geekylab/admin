'use strict';

/**
 * @ngdoc service
 * @name clientApp.Customers
 * @description
 * # Customers
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Customers', function () {
        return $resource('/api/customer/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
