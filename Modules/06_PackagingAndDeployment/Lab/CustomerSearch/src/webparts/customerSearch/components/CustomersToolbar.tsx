import * as React from 'react';

import CustomerSearch from './CustomerSearch';

import ICustomer from '../../../models/ICustomer';
import ICustomersService from '../../../models/ICustomersService';
import CustomersService from "../../../services/CustomersService";

import styles from './CustomersToolbar.module.scss';

export interface CustomersToolbarProperties {
  customerSearch: CustomerSearch;
}

export default class CustomersToolbar extends React.Component<CustomersToolbarProperties, any> {

  private letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  public render() {
    let inTableView: boolean = this.props.customerSearch.state.viewType == "table";

    return (
      <div className={styles.customersToolbar} role="toolbar" >
        <nav>

          <div className={"btn-group btn-group-sm " + styles.viewMenu} role="group" >
            <button type="button"
              className={"btn btn-sm btn-secondary" + (inTableView ? " active" : "")}
              onClick={() => { this.props.customerSearch.setState({ 'viewType': 'table' }); }} >Table View</button>
            <button type="button"
              className={"btn btn-sm btn-secondary" + (!inTableView ? " active" : "")}
              onClick={() => { this.props.customerSearch.setState({ 'viewType': 'cards' }); }} >Cards View</button>
          </div>

          <div className={"input-group input-group-sm " + styles.searchMenu}>
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Search</span>
            </div>
            <input type="text" className="form-control form-control-sm" placeholder="" defaultValue="A"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                let customerService: ICustomersService = this.props.customerSearch.state.customerService;
                let searchString: string = event.target.value;
                if (searchString != "") {
                  customerService.getCustomersByLastName(searchString).then((customers: ICustomer[]) => {
                    this.props.customerSearch.setState({ customers: customers, loading: false });
                  });
                }
                else {
                  this.props.customerSearch.setState({ customers: [], loading: false });
                }
              }} />
          </div>

        </nav>
      </div >
    );
  }

}
