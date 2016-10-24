(function () {

    angular.module('customersApp').value('appSettings', appSettings());

    function appSettings() {
        return {
            title: 'Customers Application',
            version: '1.0'
        };
    }
}());


(function () {

    angular.module('customersApp').constant('appConstant', appSettings);

    var appSettings = {
        title: 'Customers Application',
        version: '1.0'
    };
}());