(function() {
    angular.module('customersApp').directive('dirPaginate', dirPaginate);
    
    function dirPaginate() {
        return {
            scope: {
                currentPage: '=',
                totalPages: '=',
                pageinate: '&'
            },
            template: '<button ng-click="pageinate()">Previous Section</button> {{currentPage}} out of {{totalPages}}<button ng-click="pageinate()">Next Section</button>',
            link: function (scope, element, attr) {
                
            }
        }
    }
}())