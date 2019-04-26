import { HttpClient } from '@microsoft/sp-http';
var CustomersService = (function () {
    function CustomersService(httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        this.getCustomersByLastName = function (lastNameSearch) {
            var restUrl = "https://subliminalsystems.azurewebsites.net/api/Customers/?" +
                "$select=CustomerId,LastName,FirstName,EmailAddress,WorkPhone,HomePhone,Company" +
                ("&$filter=startswith(tolower(LastName),tolower('" + lastNameSearch + "'))&$orderby=LastName,FirstName");
            return _this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
                .then(function (response) { return response.json(); })
                .then(function (response) {
                console.log(response.value);
                return response.value;
            });
        };
        this.getCustomer = function (customerId) {
            var restUrl = "https://subliminalsystems.azurewebsites.net/api/Customers(" + customerId + ")";
            return _this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
                .then(function (response) { return response.json(); })
                .then(function (response) {
                console.log(response);
                return response;
            });
        };
    }
    CustomersService.prototype.getCustomers = function () {
        var restUrl = "https://subliminalsystems.azurewebsites.net/api/Customers/?" +
            "$select=CustomerId,LastName,FirstName,EmailAddress,WorkPhone,HomePhone,Company" +
            "&$filter=(CustomerId+le+12)&$top=200";
        return this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
            .then(function (response) { return response.json(); })
            .then(function (response) {
            console.log(response.value);
            return response.value;
        });
    };
    return CustomersService;
}());
export default CustomersService;
//# sourceMappingURL=CustomersService.js.map