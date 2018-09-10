module myApp {

  class AppFilters {
    static $inject: Array<string> = ['$filter'];
    public static listPriceFilter($filter) {
      return (price: number) => {
        return "$" + $filter('number')(price, 2) + " USD";
      }
    }
  }

  angular.module("myApp").filter("listPrice", AppFilters.listPriceFilter);
}