/// <reference types="react" />
import * as React from 'react';
import ICustomer from '../../../models/ICustomer';
import ICustomerService from '../../../models/ICustomersService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HttpClient } from '@microsoft/sp-http';
export declare type CustomerViewType = 'table' | 'cards';
export interface ViewCustomersProperties {
    httpClient: HttpClient;
}
export interface ViewCustomersState {
    viewType: CustomerViewType;
    customerService: ICustomerService;
    customers: ICustomer[];
    loading: boolean;
}
export default class ViewCustomers extends React.Component<ViewCustomersProperties, ViewCustomersState> {
    state: ViewCustomersState;
    render(): JSX.Element;
    componentDidMount(): void;
}
