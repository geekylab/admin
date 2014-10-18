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
        'angular-loading-bar',
        'angularFileUpload',
        'cgBusy'
    ])
    .config(function ($routeProvider, $translateProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl'
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
            .otherwise({
                redirectTo: '/'
            });

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ja');
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useLocalStorage();


    });
