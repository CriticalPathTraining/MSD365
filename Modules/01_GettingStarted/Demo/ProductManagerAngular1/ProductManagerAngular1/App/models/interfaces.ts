module myApp {

  export interface IProductDataService {
    GetAllProducts(): Product[];
    GetProduct(id: number): Product;
    AddProduct(product: Product): void;
    DeleteProduct(id: number): void;
    UpdateProduct(product: Product): void;
    GetProductCategories(): string[];
    GetProductsByCategory(category: string): Product[];
  }

  export interface IProductDataServiceAsync {
    GetAllProductsAsync(): ng.IPromise<Product[]>;
    GetProductAsync(id: number): ng.IPromise<Product>;
    AddProductAsync(product: Product): ng.IPromise<void>;
    DeleteProductAsync(id: number): ng.IPromise<void>;
    UpdateProductAsync(product: Product): ng.IPromise<void>;
    GetProductCategoriesAsync(): ng.IPromise<string[]>;
    GetProductsByCategoryAsync(category: string): ng.IPromise<Product[]>;
  }

}