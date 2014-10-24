'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'base64',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.autoResize',
        'ui.grid.edit',
        'angular-loading-bar',
        'angularFileUpload',
        'cgBusy',
        'google-maps'.ns()
    ])
    .config(function ($routeProvider, $translateProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            //.when('/login', {
            //    templateUrl: 'views/login.html',
            //    controller: 'LoginCtrl'
            //})
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl'
            })
            .when('/customer', {
                templateUrl: 'views/customer.html',
                controller: 'CustomerCtrl'
            })
            .when('/customer/:id', {
                templateUrl: 'views/customeredit.html',
                controller: 'CustomereditCtrl'
            })
            .when('/item', {
                templateUrl: 'views/item.html',
                controller: 'ItemCtrl'
            })
            .when('/item/:id', {
                templateUrl: 'views/itemedit.html',
                controller: 'ItemeditCtrl'
            })
            .when('/category', {
                templateUrl: 'views/category.html',
                controller: 'CategoryCtrl'
            })
            .when('/category/edit/:id', {
                templateUrl: 'views/categoryedit.html',
                controller: 'CategoryeditCtrl'
            })
            .when('/table', {
                templateUrl: 'views/table.html',
                controller: 'TableCtrl'
            })
            .when('/table/edit/:id', {
                templateUrl: 'views/tableedit.html',
                controller: 'TableeditCtrl'
            })
            .when('/store', {
                templateUrl: 'views/store.html',
                controller: 'StoreCtrl'
            })
            .when('/store/edit/:id', {
                templateUrl: 'views/storeedit.html',
                controller: 'StoreeditCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ja');
        $translateProvider.fallbackLanguage('en');
//        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useLocalStorage();

        //$httpProvider.responseInterceptors.push(['$q', '$location', function ($q, $location) {
        //    return function (promise) {
        //        return promise.then(function (response) {
        //                // Success: 成功時はそのまま返す
        //                return response;
        //            }, function (response) {
        //                // Error: エラー時は401エラーならば/loginに遷移
        //                console.log('401');
        //                if (response.status === 401) {
        //                    window.location = '/login.html';
        //                }
        //                return $q.reject(response);
        //            }
        //        );
        //    };
        //}]);

    });
