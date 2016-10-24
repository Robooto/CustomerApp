(function () {
    angular
        .module('customersApp')
        .controller('AllOrdersController', AllOrdersController);
    
    AllOrdersController.$inject = ['CustomersFactory'];

    function AllOrdersController(CustomersFactory) {
        var vm = this;
        vm.orders = null;
        vm.ordersTotal = 0.0;
        vm.totalType;
        
        function getOrdersTotal() {
            var total = 0;
            for (var i=0,len=vm.orders.length;i<len;i++) {
                total += vm.orders[i].total;
            }
            vm.ordersTotal = total;
            vm.totalType = (vm.ordersTotal > 100) ? 'success' : 'danger';
        }

        function init() {
            CustomersFactory.getOrders()
                .then(function(response) {
                    vm.orders = response;
                    getOrdersTotal();
                }).catch(function(data, status, headers, config) {
                    //handle error
                });
        }
        init();
    }
}())