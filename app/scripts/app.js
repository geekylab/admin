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
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('admin', {
                url: "/",
                templateUrl: "views/admin.html"
            }).state('admin.main', {
                url: "/dashboard",
                templateUrl: "views/main.html"
            }).state('admin.order', {
                url: "/admin/order",
                templateUrl: "views/admin.order.html",
                controller: 'OrderCtrl'
            }).state('kitchen', {
                url: "/kitchen",
                templateUrl: "views/kitchen.html",
                controller: 'KitchenCtrl'
            });

        //$routeProvider
        //    .when('/', {
        //        templateUrl: 'views/main.html',
        //        controller: 'MainCtrl'
        //    })
        //    .when('/login', {
        //        templateUrl: 'views/login.html',
        //        controller: 'LoginCtrl'
        //    })
        //    .when('/order', {
        //        templateUrl: 'views/order.html',
        //        controller: 'OrderCtrl'
        //    })
        //    .when('/kitchen', {
        //        templateUrl: 'views/kitchen.html',
        //        controller: 'KitchenCtrl'
        //    })
        //    .otherwise({
        //        redirectTo: '/'
        //    });

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ja');
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useLocalStorage();


    });
