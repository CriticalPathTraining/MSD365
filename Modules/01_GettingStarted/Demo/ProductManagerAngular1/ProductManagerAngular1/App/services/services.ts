module myApp {

  export class InMemoryProductDataService implements IProductDataService {

    static $inject: string[] = [];

    private productListSeedData: Product[] = [
      { Id: 1, Name: "Batman Action Figure", ListPrice: 14.95, Category: "Action Figures", Description: "A super hero who sometimes plays the role of a dark knight.", ProductImageUrl: "WP0001.jpg" },
      { Id: 2, Name: "Captain America Action Figure", ListPrice: 12.95, Category: "Action Figures", Description: "A super action figure that protects freedom and the American way of life.", ProductImageUrl: "WP0002.jpg" },
      { Id: 3, Name: "Easel with Supply Trays", ListPrice: 49.95, Category: "Arts and Crafts", Description: "A serious easel for serious young artists.", ProductImageUrl: "WP0003.jpg" },
      { Id: 4, Name: "Crate o' Crayons", ListPrice: 14.95, Category: "Arts and Crafts", Description: "More crayons that you can shake a stick at.", ProductImageUrl: "WP0004.jpg" },
      { Id: 5, Name: "Green Stomper Bully", ListPrice: 24.95, Category: "Remote Control", Description: "A green alternative to crush and destroy the Red Stomper Bully.", ProductImageUrl: "WP0005.jpg" },
      { Id: 6, Name: "Indy Race Car", ListPrice: 19.95, Category: "Remote Control", Description: "The fastest remote control race car on the market today.", ProductImageUrl: "WP0006.jpg" },
      { Id: 7, Name: "Twitter Follower Action Figure", ListPrice: 1.00, Category: "Action Figures", Description: "An inexpensive action figure you can never have too many of.", ProductImageUrl: "WP0007.jpg" },
      { Id: 8, Name: "Sandpiper Prop Plane", ListPrice: 24.95, Category: "Remote Control", Description: "A simple RC prop plane for younger pilots.", ProductImageUrl: "WP0008.jpg" },
      { Id: 9, Name: "Etch A Sketch", ListPrice: 12.95, Category: "Arts and Crafts", Description: "A strategic planning tool for the Romney campaign.", ProductImageUrl: "WP0009.jpg" },
      { Id: 10, Name: "Flying Squirrel", ListPrice: 69.95, Category: "Remote Control", Description: "A stealthy remote control plane that flies on the down-low and under the radar.", ProductImageUrl: "WP0010.jpg" },
      { Id: 11, Name: "FOX News Chopper", ListPrice: 29.95, Category: "Remote Control", Description: "A new chopper which can generate new events on demand.", ProductImageUrl: "WP0011.jpg" },
      { Id: 12, Name: "Godzilla Action Figure", ListPrice: 19.95, Category: "Action Figures", Description: "The classic and adorable action figure from those old Japanese movies.", ProductImageUrl: "WP0012.jpg" },
      { Id: 13, Name: "Perry the Platypus Action Figure", ListPrice: 21.95, Category: "Action Figures", Description: "A platypus who plays an overly intelligent detective sleuth on TV.", ProductImageUrl: "WP0013.jpg" },
      { Id: 14, Name: "Seal Team 6 Helicopter", ListPrice: 59.95, Category: "Remote Control", Description: "A serious helicopter that can open up a can of whoop-ass when required.", ProductImageUrl: "WP0014.jpg" },
      { Id: 15, Name: "Crayloa Crayon Set", ListPrice: 2.49, Category: "Arts and Crafts", Description: "A very fun set of crayons in every color.", ProductImageUrl: "WP0015.jpg" }
    ];

    constructor(private products: Product[]) {
      this.products = this.productListSeedData;
    }

    GetAllProducts(): Product[] {
      return this.products;
    };

    GetProduct(id: number): Product {
      let products: Product[] = this.products.filter(product => product.Id === id);
      let product: Product = products[0];
      return product;
    };

    AddProduct(product: Product): void {
      let Ids: number[] = this.products.map(p => p.Id);
      let newId = Math.max(...Ids) + 1;
      product.Id = newId;
      this.products.push(product);
    };

    DeleteProduct(id: number): void {
      let index = this.products.map(product => product.Id).indexOf(id);
      this.products.splice(index, 1);
    };

    UpdateProduct(product: Product): void {
      let index = this.products.map(product => product.Id).indexOf(product.Id);
      this.products[index] = product;
    };

    GetProductCategories(): string[] {
      return ["Action Figures", "Arts and Crafts", "Remote Control"];
    };

    GetProductsByCategory(category: string): Product[] {
      return this.products.filter(product => product.Category === category);
    }

  }

  export class AsyncInMemoryProductDataService implements IProductDataServiceAsync {

    private productListSeedData: Product[] = [
      { Id: 1, Name: "Batman Action Figure", ListPrice: 14.95, Category: "Action Figures", Description: "A super hero who sometimes plays the role of a dark knight.", ProductImageUrl: "WP0001.jpg" },
      { Id: 2, Name: "Captain America Action Figure", ListPrice: 12.95, Category: "Action Figures", Description: "A super action figure that protects freedom and the American way of life.", ProductImageUrl: "WP0002.jpg" },
      { Id: 3, Name: "Easel with Supply Trays", ListPrice: 49.95, Category: "Arts and Crafts", Description: "A serious easel for serious young artists.", ProductImageUrl: "WP0003.jpg" },
      { Id: 4, Name: "Crate o' Crayons", ListPrice: 14.95, Category: "Arts and Crafts", Description: "More crayons that you can shake a stick at.", ProductImageUrl: "WP0004.jpg" },
      { Id: 5, Name: "Green Stomper Bully", ListPrice: 24.95, Category: "Remote Control", Description: "A green alternative to crush and destroy the Red Stomper Bully.", ProductImageUrl: "WP0005.jpg" },
      { Id: 6, Name: "Indy Race Car", ListPrice: 19.95, Category: "Remote Control", Description: "The fastest remote control race car on the market today.", ProductImageUrl: "WP0006.jpg" },
      { Id: 7, Name: "Twitter Follower Action Figure", ListPrice: 1.00, Category: "Action Figures", Description: "An inexpensive action figure you can never have too many of.", ProductImageUrl: "WP0007.jpg" },
      { Id: 8, Name: "Sandpiper Prop Plane", ListPrice: 24.95, Category: "Remote Control", Description: "A simple RC prop plane for younger pilots.", ProductImageUrl: "WP0008.jpg" },
      { Id: 9, Name: "Etch A Sketch", ListPrice: 12.95, Category: "Arts and Crafts", Description: "A strategic planning tool for the Romney campaign.", ProductImageUrl: "WP0009.jpg" },
      { Id: 10, Name: "Flying Squirrel", ListPrice: 69.95, Category: "Remote Control", Description: "A stealthy remote control plane that flies on the down-low and under the radar.", ProductImageUrl: "WP0010.jpg" },
      { Id: 11, Name: "FOX News Chopper", ListPrice: 29.95, Category: "Remote Control", Description: "A new chopper which can generate new events on demand.", ProductImageUrl: "WP0011.jpg" },
      { Id: 12, Name: "Godzilla Action Figure", ListPrice: 19.95, Category: "Action Figures", Description: "The classic and adorable action figure from those old Japanese movies.", ProductImageUrl: "WP0012.jpg" },
      { Id: 13, Name: "Perry the Platypus Action Figure", ListPrice: 21.95, Category: "Action Figures", Description: "A platypus who plays an overly intelligent detective sleuth on TV.", ProductImageUrl: "WP0013.jpg" },
      { Id: 14, Name: "Seal Team 6 Helicopter", ListPrice: 59.95, Category: "Remote Control", Description: "A serious helicopter that can open up a can of whoop-ass when required.", ProductImageUrl: "WP0014.jpg" },
      { Id: 15, Name: "Crayloa Crayon Set", ListPrice: 2.49, Category: "Arts and Crafts", Description: "A very fun set of crayons in every color.", ProductImageUrl: "WP0015.jpg" }
    ];

    static $inject = ['$q'];
    constructor(private $q: ng.IQService, private products: Product[]) {
      this.products = this.productListSeedData;
    }

    GetAllProductsAsync(): ng.IPromise<Product[]> {
      return this.$q.when(this.productListSeedData);
    }

    GetProductAsync(id: number): ng.IPromise<Product> {
      var products: Product[] = this.products.filter(product => product.Id === id);
      return this.$q.when(products[0]);
    }

    AddProductAsync(product: Product): ng.IPromise<void> {
      let Ids: number[] = this.products.map(p => p.Id);
      let newId = Math.max(...Ids) + 1;
      product.Id = newId;
      this.products.push(product);
      return this.$q.when();
    }

    DeleteProductAsync(id: number): ng.IPromise<void> {
      var index = this.products.map(product => product.Id).indexOf(id);
      this.products.splice(index, 1);
      return this.$q.when();
    }

    UpdateProductAsync(product: Product): ng.IPromise<void> {
      var index = this.products.map(product => product.Id).indexOf(product.Id);
      this.products[index] = product;
      return this.$q.when();
    }

    GetProductCategoriesAsync(): ng.IPromise<string[]> {
      return this.$q.when(["Action Figures", "Arts and Crafts", "Remote Control"]);
    }

    GetProductsByCategoryAsync(category: string): ng.IPromise<Product[]> {
      return this.$q.when(this.products.filter(product => product.Category === category));
    }

  }

  angular.module('myApp').service('ProductDataService', AsyncInMemoryProductDataService);

}



