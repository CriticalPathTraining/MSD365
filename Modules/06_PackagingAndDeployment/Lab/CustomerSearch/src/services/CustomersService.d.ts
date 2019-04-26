import ICustomer from "../models/ICustomer";
import ICustomerDetail from "../models/ICustomerDetail";
import ICustomersService from "../models/ICustomersService";
import { HttpClient } from '@microsoft/sp-http';
export default class CustomersService implements ICustomersService {
    private httpClient;
    constructor(httpClient: HttpClient);
    getCustomers(): Promise<ICustomer[]>;
    getCustomersByLastName: (lastNameSearch: string) => Promise<ICustomer[]>;
    getCustomer: (customerId: string) => Promise<ICustomerDetail>;
}
