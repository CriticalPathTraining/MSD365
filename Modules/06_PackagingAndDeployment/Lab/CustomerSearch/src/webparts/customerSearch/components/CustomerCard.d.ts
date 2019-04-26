/// <reference types="react" />
import * as React from 'react';
import ICustomer from "../../../models/ICustomer";
export interface CustomerCardProperties {
    customer: ICustomer;
}
export default class CustomerCard extends React.Component<CustomerCardProperties, any> {
    render(): JSX.Element;
}
