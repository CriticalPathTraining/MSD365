var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import CustomersService from "../../../services/CustomersService";
import CustomersToolbar from './CustomersToolbar';
import CustomersTable from './CustomersTable';
import CustomerCard from './CustomerCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './CustomerSearch.module.scss';
var ViewCustomers = (function (_super) {
    __extends(ViewCustomers, _super);
    function ViewCustomers() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            viewType: 'table',
            customerService: new CustomersService(_this.props.httpClient),
            customers: [],
            loading: false
        };
        return _this;
    }
    ViewCustomers.prototype.render = function () {
        return (React.createElement("div", { className: styles.customerSearch },
            React.createElement(CustomersToolbar, { customerSearch: this }),
            React.createElement("div", null, this.state.viewType === "table" ?
                React.createElement(CustomersTable, { customers: this.state.customers }) :
                React.createElement("div", { className: styles.cardBackdrop }, this.state.customers.map(function (customer) { return React.createElement(CustomerCard, { customer: customer }); })))));
    };
    ViewCustomers.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({ loading: true });
        this.state.customerService.getCustomersByLastName("A").then(function (customers) {
            _this.setState({ customers: customers, loading: false });
        });
    };
    return ViewCustomers;
}(React.Component));
export default ViewCustomers;
//# sourceMappingURL=CustomerSearch.js.map