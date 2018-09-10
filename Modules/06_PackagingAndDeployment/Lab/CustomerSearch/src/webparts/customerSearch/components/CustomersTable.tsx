import * as React from 'react';

import ICustomer from "../../../models/ICustomer";

import styles from './CustomersTable.module.scss';

export interface CustomersTableProperties {
  customers: ICustomer[];
}

export default class CustomersTable extends React.Component<CustomersTableProperties, any> {

  public render() {
    return (
      <div>
        {this.props.customers.length > 0 ? (
          <table
            className={"table table-striped table-bordered table-hover table-sm " + styles.customersTable} >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Work Phone</th>
                <th>Home Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.props.customers.map((customer: ICustomer) =>
                <tr key={customer.CustomerId} >
                  <td>{customer.CustomerId}</td>
                  <td>{customer.FirstName}</td>
                  <td>{customer.LastName}</td>
                  <td>{customer.Company}</td>
                  <td>{customer.EmailAddress}</td>
                  <td>{customer.WorkPhone}</td>
                  <td>{customer.HomePhone}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
            <div className="col content-body">
              <div className="alert alert-info" role="alert">
                <strong>No customers returned.</strong> Please refine your search query.
              </div>
            </div>
          )
        }
      </div>
    );
  }

}