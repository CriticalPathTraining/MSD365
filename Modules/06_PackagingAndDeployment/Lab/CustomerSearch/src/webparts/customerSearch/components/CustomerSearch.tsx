import * as React from 'react';

import ICustomer from '../../../models/ICustomer';
import ICustomerService from '../../../models/ICustomersService';
import CustomersService from "../../../services/CustomersService";

import CustomersToolbar from './CustomersToolbar';
import CustomersTable from './CustomersTable';
import CustomerCard from './CustomerCard';

import 'bootstrap/dist/css/bootstrap.min.css';

import styles from './CustomerSearch.module.scss';
import { ICustomerSearchProps } from './ICustomerSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';


import {
  HttpClient
} from '@microsoft/sp-http';

export type CustomerViewType = 'table' | 'cards';

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

  public state: ViewCustomersState = {
    viewType: 'table',
    customerService: new CustomersService(this.props.httpClient),
    customers: [],
    loading: false
  };

  public render() {
    return (
      <div className={styles.customerSearch} >
        <CustomersToolbar customerSearch={this} />
        <div  >
          {this.state.viewType === "table" ?
            <CustomersTable customers={this.state.customers} /> :
            <div className={styles.cardBackdrop} >
              {this.state.customers.map((customer: ICustomer) => <CustomerCard customer={customer} />)}
            </div>
          }
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.setState({ loading: true });
    this.state.customerService.getCustomersByLastName("A").then((customers: ICustomer[]) => {
      this.setState({ customers: customers, loading: false });
    });
  }
}