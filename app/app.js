(function () {
    angular.module('customersApp', ['ngRoute', 'ngAnimate']);
    angular.module('customersApp').config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/', {
                controller: 'CustomersController',
                controllerAs: 'vm',
                templateUrl: '/app/views/customers.html'
            }).when('/orders/:customerId', {
                controller: 'OrdersController',
                controllerAs: 'vm',
                templateUrl: '/app/views/orders.html'
            }).when('/orders', {
                controller: 'AllOrdersController',
                controllerAs: 'vm',
                templateUrl: 'app/views/allorders.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
}())