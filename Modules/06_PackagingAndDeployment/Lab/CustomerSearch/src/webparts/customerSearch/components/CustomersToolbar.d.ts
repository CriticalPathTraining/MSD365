/// <reference types="react" />
import * as React from 'react';
import CustomerSearch from './CustomerSearch';
export interface CustomersToolbarProperties {
    customerSearch: CustomerSearch;
}
export default class CustomersToolbar extends React.Component<CustomersToolbarProperties, any> {
    private letters;
    render(): JSX.Element;
}
