(function () {
    'use strict';

    angular
            .module('app', ['ngRoute', 'ngCookies', 'ngResource', 'checklist-model', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
            .config(config)
            .run(run);

    config.$inject = ['$mdThemingProvider', '$mdIconProvider', '$routeProvider', '$locationProvider', '$httpProvider', '$provide'];
    function config($mdThemingProvider, $mdIconProvider, $routeProvider, $locationProvider, $httpProvider, $provide) {
        $mdThemingProvider.theme('forest')
                .primaryPalette('brown')
                .accentPalette('green');

        $mdIconProvider
                .defaultIconSet('img/icons/sets/social-icons.svg', 24);


        $mdIconProvider
                .icon('share-arrow', 'img/icons/share-arrow.svg', 24)
                .icon('upload', 'img/icons/upload.svg', 24)
                .icon('copy', 'img/icons/copy.svg', 24)
                .icon('print', 'img/icons/print.svg', 24)
                .icon('hangout', 'img/icons/hangout.svg', 24)
                .icon('mail', 'img/icons/mail.svg', 24)
                .icon('message', 'img/icons/message.svg', 24)
                .icon('copy2', 'img/icons/copy2.svg', 24)
                .icon('facebook', 'img/icons/facebook.svg', 24)
                .icon('twitter', 'img/icons/twitter.svg', 24);
        $routeProvider
                .when('/programa', {
                    templateUrl: '/programa'
                })
                .when('/programa/solicitud/:pId/:pName/:pInitDate/:pEndDate/:pClientAmmount/:pChildAmmount', {
                    templateUrl: '/programa/solicitud'
                })
                .when('/solicitante', {
                    templateUrl: '/solicitante'
                })
                .when('/contacto', {
                    templateUrl: '/contacto'
                })
                .when('/suplemento', {
                    templateUrl: '/suplemento'
                })
                .when('/usuario', {
                    templateUrl: '/usuario'
                })
                .when('/ruta', {
                    templateUrl: '/ruta'
                })
                .when('/vehiculo', {
                    templateUrl: '/vehiculo'
                })
                .when('/alojamiento', {
                    templateUrl: '/alojamiento'
                })
                .when('/servicio', {
                    templateUrl: '/servicio'
                })
                .when('/proveedor', {
                    templateUrl: '/proveedor'
                })
                .when('/login', {
                    templateUrl: '/login'
                })
                .when('/notification', {
                    templateUrl: '/notification'
                })
                .otherwise({redirectTo: '/login'});

    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, current, prev) {
            $('#bs-example-navbar-collapse-1').removeClass('in');
            $('#bs-example-navbar-collapse-1').addClass('collapse');
            $rootScope.WhereIam = "Cargando...";
            if ($rootScope.globals.searchOpen) {
                $rootScope.globals.searchOpen = !$rootScope.globals.searchOpen;
                $('.global-search').toggleClass('global-search-active');
                if ($rootScope.globals.searchOpen)
                    $('.bg-search').css('visibility', ' visible');
                else
                    $('.bg-search').css('visibility', ' hidden');
            }

            $rootScope.dataLoading = true;
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/loguin']) === -1;
            var loggedIn = $rootScope.globals.currentUser;


            if ($location.path() === '/login') {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $cookieStore.remove('authorization');
            }

            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }

        });
    }



})();