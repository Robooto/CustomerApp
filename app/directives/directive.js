(function() {
    angular.module('customersApp').directive('dirPaginate', dirPaginate);
    
    function dirPaginate() {
        return {
            scope: {},
            template: '<button>Previous Section</button> {{currentPage}} out of {{totalPage}}<button>Next Section</button>'
        }
    }
}())