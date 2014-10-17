'use strict';

/**
 * @ngdoc service
 * @name clientApp.categories
 * @description
 * # categories
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Categories', function () {
        return $resource('/api/category/:id', {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
