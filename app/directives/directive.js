(function () {
    angular.module('customersApp').directive('tableHelper', tableHelper);

    tableHelper.$inject = ['$parse'];

    function tableHelper($parse) {

        return {
            restrict: 'E',
            scope: {},
            require: 'ngModel',
            template: '<div class="tableHelper"></div>',
            link: function (scope, element, attrs, ngModel) {
                var headerCols = [];
                var tableStart = '<table>';
                var tableEnd = '</table>';
                var table = '';
                var visibleProps = [];
                var sortCol = null;
                var sortDir = 1;
                var columnmap = null;

                columnmap = $parse(attrs.columnmap)();

                //                scope.$watch(function () {
                //                    return ngModel.$modelValue;
                //                }, function (newValue) {
                //                    render();
                //                });

                ngModel.$render = function () {
                    render();
                };
                wireEvents();

                function render() {
                    scope.datasource = ngModel.$modelValue;
                    if (scope.datasource && scope.datasource.length) {
                        table += tableStart;
                        table += renderHeader();
                        table += renderRows() + tableEnd;
                        renderTable();
                    }
                }

                function wireEvents() {
                    element.on('click', function (event) {
                        if (event.srcElement.nodeName === 'TH') {
                            var val = event.srcElement.innerHTML;
                            var col = (columnmap) ? getRawColumnName(val) : val;
                            if (col) sort(col);
                        }
                    });
                }

                function sort(col) {
                    //See if they clicked on the same header
                    //If they did then reverse the sort
                    if (sortCol === col) sortDir = sortDir * -1;
                    sortCol = col;
                    scope.datasource.sort(function (a, b) {
                        if (a[col] > b[col]) return 1 * sortDir;
                        if (a[col] < b[col]) return -1 * sortDir;
                        return 0;
                    });
                    render();
                }

                function renderHeader() {
                    var tr = '<tr>';
                    for (var prop in scope.datasource[0]) {
                        var val = getColumnName(prop);
                        if (val) {
                            //Track visible properties to make it fast to check them later
                            visibleProps.push(prop);
                            tr += '<th>' + val + '</th>';
                        }
                    }
                    tr += '</tr>';
                    tr = '<thead>' + tr + '</thead>';
                    return tr;
                }

                function renderRows() {
                    var rows = '';
                    for (var i = 0, len = scope.datasource.length; i < len; i++) {
                        rows += '<tr>';
                        var row = scope.datasource[i];
                        for (var prop in row) {
                            if (visibleProps.indexOf(prop) > -1) {
                                rows += '<td>' + row[prop] + '</td>';
                            }
                        }
                        rows += '</tr>';
                    }
                    rows = '<tbody>' + rows + '</tbody>';
                    return rows;
                }

                function renderTable() {
                    table += '<br /><div class="rowCount">' + scope.datasource.length + ' rows</div>';
                    element.html(table);
                    table = '';
                }

                function getRawColumnName(friendlyCol) {
                    var rawCol;
                    columnmap.forEach(function (colMap) {
                        for (var prop in colMap) {
                            if (colMap[prop] === friendlyCol) {
                                rawCol = prop;
                                break;
                            }
                        }
                        return null;
                    });
                    return rawCol;
                }

                function filterColumnMap(prop) {
                    var val = columnmap.filter(function (map) {
                        if (map[prop]) {
                            return true;
                        }
                        return false;
                    });
                    return val;
                }

                function getColumnName(prop) {
                    if (!columnmap) return prop;
                    var val = filterColumnMap(prop);
                    if (val && val.length && !val[0].hidden) return val[0][prop];
                    else return null;
                }
            }
        }
    }
}());



(function () {
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
}());

(function () {
    angular.module('customersApp').directive('linkDemo', linkDemo);

    function linkDemo() {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.on('click', function () {
                    elem.html('You Clicked Me!');
                });

                elem.on('mouseenter', function () {
                    elem.css('background-color', 'yellow');
                });

                elem.on('mouseleave', function () {
                    elem.css('background-color', 'white');
                });
            }
        }
    }

}())