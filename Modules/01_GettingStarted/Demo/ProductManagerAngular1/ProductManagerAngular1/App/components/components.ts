module myApp {

  let app = angular.module("myApp");

  class ProductNavigationController {
    static $inject: string[] = ['ProductDataService'];
    public productCategories: string[];

    constructor(private ProductDataService: IProductDataServiceAsync) {
      // initialize view model inside $onInit not in constructor
    };

    public $onInit() {
      this.ProductDataService.GetProductCategoriesAsync()
        .then((result: string[]) => {
          this.productCategories = result;
        });
    }
  }

  class ProductNavigation implements ng.IComponentOptions {

    public bindings: { [binding: string]: string };
    public controller: any;
    public templateUrl: any;

    constructor() {
      this.bindings = {};
      this.controller = ProductNavigationController;
      this.templateUrl = '/App/components/productNavigation.html';
    }

  }

  app.component("productNavigation", new ProductNavigation());
}    

