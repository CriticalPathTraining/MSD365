var myApp;
(function (myApp) {
    var app = angular.module("myApp");
    var HomeController = /** @class */ (function () {
        function HomeController() {
            this.$onInit = function () { };
            this.welcomeMessage = "Welcome to the Wingtip Product Manager";
            this.topic1Title = "Add a new product";
            this.topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
            this.topic2Title = "See the Product Showcase";
            this.topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
        }
        HomeController.$inject = [];
        return HomeController;
    }());
    app.controller('homeController', HomeController);
    var ProductsController = /** @class */ (function () {
        function ProductsController($location, ProductDataService) {
            var _this = this;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.$onInit = function () { };
            ProductDataService.GetAllProductsAsync()
                .then(function (result) {
                _this.products = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        ProductsController.prototype.deleteProduct = function (id) {
            var _this = this;
            this.ProductDataService.DeleteProductAsync(id)
                .then(function () {
                _this.$location.path("/products");
            });
        };
        ProductsController.$inject = ['$location', 'ProductDataService'];
        return ProductsController;
    }());
    app.controller('productsController', ProductsController);
    var AddProductController = /** @class */ (function () {
        function AddProductController($location, ProductDataService) {
            var _this = this;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.$onInit = function () { };
            this.product = new myApp.Product();
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        AddProductController.prototype.addProduct = function () {
            var _this = this;
            this.ProductDataService.AddProductAsync(this.product)
                .then(function () {
                _this.$location.path("/products");
            });
        };
        AddProductController.$inject = ['$location', 'ProductDataService'];
        return AddProductController;
    }());
    app.controller('addProductController', AddProductController);
    var ViewProductController = /** @class */ (function () {
        function ViewProductController($routeParams, ProductDataService) {
            var _this = this;
            this.$onInit = function () { };
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then(function (result) {
                _this.product = result;
            });
        }
        ViewProductController.$inject = ['$routeParams', 'ProductDataService'];
        return ViewProductController;
    }());
    app.controller('viewProductController', ViewProductController);
    var EditProductController = /** @class */ (function () {
        function EditProductController($routeParams, $location, ProductDataService) {
            var _this = this;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.$onInit = function () { };
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then(function (result) {
                _this.product = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        EditProductController.prototype.updateProduct = function () {
            var _this = this;
            this.ProductDataService.UpdateProductAsync(this.product)
                .then(function () { _this.$location.path("/products"); });
        };
        EditProductController.$inject = ['$routeParams', '$location', 'ProductDataService'];
        return EditProductController;
    }());
    app.controller('editProductController', EditProductController);
    var ProductShowcaseController = /** @class */ (function () {
        function ProductShowcaseController($location, ProductDataService) {
            var _this = this;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.$onInit = function () { };
            var categoryFilter = $location.search().category;
            if (categoryFilter === undefined) {
                ProductDataService.GetAllProductsAsync()
                    .then(function (result) {
                    _this.products = result;
                });
            }
            else {
                ProductDataService.GetProductsByCategoryAsync(categoryFilter)
                    .then(function (result) {
                    _this.products = result;
                });
            }
        }
        ProductShowcaseController.$inject = ['$location', 'ProductDataService'];
        return ProductShowcaseController;
    }());
    app.controller('productShowcaseController', ProductShowcaseController);
})(myApp || (myApp = {}));
//# sourceMappingURL=controllers.js.map