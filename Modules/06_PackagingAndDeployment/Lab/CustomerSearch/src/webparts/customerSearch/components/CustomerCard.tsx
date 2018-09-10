import * as React from 'react';

import ICustomer from "../../../models/ICustomer";

import styles from './CustomerCard.module.scss';

export interface CustomerCardProperties {
  customer: ICustomer;
}

export default class CustomerCard extends React.Component<CustomerCardProperties, any> {

  public render() {
    return (
      <div className={styles.customerCard} >
        <div className={styles.cardHeader}>
          {this.props.customer.FirstName + " " + this.props.customer.LastName}
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardText} >
            Work Phone: <strong>{this.props.customer.WorkPhone}</strong>
          </div>
          <div className={styles.cardText} >
            Home Phone: <strong>{this.props.customer.HomePhone}</strong>
          </div>
        </div>
      </div>
    );
  }
}