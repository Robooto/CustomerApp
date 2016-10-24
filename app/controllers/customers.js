(function () {
    angular.module('customersApp').controller('CustomersController', CustomersController);
    CustomersController.$inject = ['CustomersFactory', 'appSettings', '$window', '$log'];

    function CustomersController(CustomersFactory, appSettings, $window, $log) {
        var vm = this;

        vm.appSettings = appSettings;
        vm.sortBy = 'name';
        vm.reverse = false;
        vm.doSort = function (propName) {
            vm.sortBy = propName;
            vm.reverse = !vm.reverse;
        };

        CustomersFactory.getCustomers()
            .then(function (customers) {
                vm.customers = customers;
            })
            .catch(function (error) {
                console.log(error);
            });
        
        vm.deleteCustomer = function(customerId) {
            CustomersFactory.deleteCustomer(customerId)
                .then(function(response) {
                    var status = response.data;
                    if (status) {
                        for (var i=0,len=vm.customers.length;i<len;i++) {
                            if (vm.customers[i].id === customerId) {
                               vm.customers.splice(i,1);
                               break;
                            }
                        }  
                    }
                    else {
                        $window.alert('Unable to delete customer');   
                    }
                    
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        };
    }
}())