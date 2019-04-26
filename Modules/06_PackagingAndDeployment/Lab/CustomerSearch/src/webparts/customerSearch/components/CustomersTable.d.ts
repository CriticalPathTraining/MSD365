/// <reference types="react" />
import * as React from 'react';
import ICustomer from "../../../models/ICustomer";
export interface CustomersTableProperties {
    customers: ICustomer[];
}
export default class CustomersTable extends React.Component<CustomersTableProperties, any> {
    render(): JSX.Element;
}
