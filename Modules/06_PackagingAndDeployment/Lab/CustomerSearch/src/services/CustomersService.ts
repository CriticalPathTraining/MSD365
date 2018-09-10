import ICustomer from "../models/ICustomer";
import ICustomerDetail from "../models/ICustomerDetail";
import ICustomersService from "../models/ICustomersService";

import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
  HttpClientConfiguration
} from '@microsoft/sp-http';

export default class CustomersService implements ICustomersService {

  constructor(private httpClient: HttpClient) {

  }


  public getCustomers(): Promise<ICustomer[]> {


    const restUrl =
      "https://subliminalsystems.azurewebsites.net/api/Customers/?" +
      "$select=CustomerId,LastName,FirstName,EmailAddress,WorkPhone,HomePhone,Company" +
      "&$filter=(CustomerId+le+12)&$top=200";
    return this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
      .then(response => response.json())
      .then(response => {
        console.log(response.value);
        return response.value;
      });
  }

  public getCustomersByLastName = (lastNameSearch: string): Promise<ICustomer[]> => {
    const restUrl =
      "https://subliminalsystems.azurewebsites.net/api/Customers/?" +
      "$select=CustomerId,LastName,FirstName,EmailAddress,WorkPhone,HomePhone,Company" +
      `&$filter=startswith(tolower(LastName),tolower('${lastNameSearch}'))&$orderby=LastName,FirstName`;
    return this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
      .then(response => response.json())
      .then(response => {
        console.log(response.value);
        return response.value;
      });
  }

  public getCustomer = (customerId: string): Promise<ICustomerDetail> => {
    const restUrl = "https://subliminalsystems.azurewebsites.net/api/Customers(" + customerId + ")";
    return this.httpClient.fetch(restUrl, HttpClient.configurations.v1, { method: "GET" })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  }

}