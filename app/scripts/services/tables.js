'use strict';

/**
 * @ngdoc service
 * @name clientApp.tables
 * @description
 * # tables
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('tables', function () {
        return $resource('/api/table/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
