(function () {
    angular.module('customersApp').factory('CustomersFactory', CustomersFactory);

    CustomersFactory.$inject = ['$http', '$q', '$log'];

    function CustomersFactory($http, $q, $log) {

        function getCustomers() {
            return $http.get('/customers')
                .then(function (response) {
                    return response.data;
                }).catch(function (reponse) {
                    $log.error(reponse);
                    return $q.reject('Error retrieving customers');
                })
        }

        function getCustomer(customerId) {
            return $http.get('/customers/' + customerId)
                .then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    $log.error(reponse);
                    return $q.reject('Error retrieving customer');
                })
        }

        function getOrders() {
            return $http.get('/orders')
                .then(function (response) {
                    return response.data;
                }).catch(function (reponse) {
                    $log.error(reponse);
                    return $q.reject('Error retrieving customers');
                })
        }

        function deleteCustomer(customerId) { 
            return $http.delete('/customers/' + customerId);
        }

        return {
            getCustomers: getCustomers,
            getCustomer: getCustomer,
            getOrders: getOrders,
            deleteCustomer: deleteCustomer
        };
    }
}())