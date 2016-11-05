(function() {
    'use strict';
    
    var tranclusion = function () {
        var template = '<div>Name: <input type="text" ng-model="vm.title" />&nbsp;' +
            '<button ng-click="vm.addTask()">Add Task</button>' +
            '<div class="taskContainer"><br />' +
            '<ng-transclude></ng-transclude>' +
            '</div></div>';
        
        var controller = function () {
            var vm = this;
            
            vm.addTask = function () {
                if (!vm.tasks) vm.tasks = [];
                
                vm.tasks.push({
                    title: vm.title
                });
            };
        };
        
        return {
            restrict: 'E',
            scope: {
                tasks: '='
            },
            transclude: true,
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            template: template
        }
    };
    
    angular.module('customersApp').directive('transclusion', tranclusion);
}());