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
import styles from './CustomersTable.module.scss';
var CustomersTable = (function (_super) {
    __extends(CustomersTable, _super);
    function CustomersTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomersTable.prototype.render = function () {
        return (React.createElement("div", null, this.props.customers.length > 0 ? (React.createElement("table", { className: "table table-striped table-bordered table-hover table-sm " + styles.customersTable },
            React.createElement("thead", { className: "thead-dark" },
                React.createElement("tr", null,
                    React.createElement("th", null, "ID"),
                    React.createElement("th", null, "First Name"),
                    React.createElement("th", null, "Last Name"),
                    React.createElement("th", null, "Company"),
                    React.createElement("th", null, "Email"),
                    React.createElement("th", null, "Work Phone"),
                    React.createElement("th", null, "Home Phone"))),
            React.createElement("tbody", null, this.props.customers.map(function (customer) {
                return React.createElement("tr", { key: customer.CustomerId },
                    React.createElement("td", null, customer.CustomerId),
                    React.createElement("td", null, customer.FirstName),
                    React.createElement("td", null, customer.LastName),
                    React.createElement("td", null, customer.Company),
                    React.createElement("td", null, customer.EmailAddress),
                    React.createElement("td", null, customer.WorkPhone),
                    React.createElement("td", null, customer.HomePhone));
            })))) : (React.createElement("div", { className: "col content-body" },
            React.createElement("div", { className: "alert alert-info", role: "alert" },
                React.createElement("strong", null, "No customers returned."),
                " Please refine your search query.")))));
    };
    return CustomersTable;
}(React.Component));
export default CustomersTable;
//# sourceMappingURL=CustomersTable.js.map