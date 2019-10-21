(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngMaterial'])
        .config(config)
        .run(run);
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                controller: 'Home',
                templateUrl: 'view/home.html',
                controllerAs: "hm"
            })
            .otherwise({redirectTo: '/home'});
    }

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        $rootScope.$on('$locationChangeStart', function () {

        });
    }
})();
