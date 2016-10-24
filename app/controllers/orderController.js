(function () {
    angular
        .module('customersApp')
        .controller('OrdersController', OrdersController);
    
    OrdersController.$inject = ['$routeParams', 'CustomersFactory'];

    function OrdersController($routeParams, CustomersFactory) {
        var vm = this;
        vm.customerId = $routeParams.customerId;
        vm.customer = null;

        function init() {
            //Search the customers for the customerId
            CustomersFactory.getCustomer(vm.customerId)
            .then(function (customer) {
                vm.customer = customer;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
        init();
    }
}())