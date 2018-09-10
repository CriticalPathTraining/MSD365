var myApp;
(function (myApp) {
    var AppFilters = /** @class */ (function () {
        function AppFilters() {
        }
        AppFilters.listPriceFilter = function ($filter) {
            return function (price) {
                return "$" + $filter('number')(price, 2) + " USD";
            };
        };
        AppFilters.$inject = ['$filter'];
        return AppFilters;
    }());
    angular.module("myApp").filter("listPrice", AppFilters.listPriceFilter);
})(myApp || (myApp = {}));
//# sourceMappingURL=filters.js.map