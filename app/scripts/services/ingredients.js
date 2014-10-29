'use strict';

/**
 * @ngdoc service
 * @name clientApp.Ingredients
 * @description
 * # Ingredients
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Ingredients', function ($resource) {
        return $resource('/api/ingredients/:id', {id: '@_id', name: '@name', lang: '@lang'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            },
            query: {
                method: 'GET',
                isArray: true,
                params: {
                    name: "@name",
                    lang: "@lang"
                }
            }
        });
    });
