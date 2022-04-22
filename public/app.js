'use strict';

// Application Modules and Routing
angular
    .module('lycan', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/shop.html',
                controller: 'shopCtrl'
            })

    });