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
import styles from './CustomersToolbar.module.scss';
var CustomersToolbar = (function (_super) {
    __extends(CustomersToolbar, _super);
    function CustomersToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        return _this;
    }
    CustomersToolbar.prototype.render = function () {
        var _this = this;
        var inTableView = this.props.customerSearch.state.viewType == "table";
        return (React.createElement("div", { className: styles.customersToolbar, role: "toolbar" },
            React.createElement("nav", null,
                React.createElement("div", { className: "btn-group btn-group-sm " + styles.viewMenu, role: "group" },
                    React.createElement("button", { type: "button", className: "btn btn-sm btn-secondary" + (inTableView ? " active" : ""), onClick: function () { _this.props.customerSearch.setState({ 'viewType': 'table' }); } }, "Table View"),
                    React.createElement("button", { type: "button", className: "btn btn-sm btn-secondary" + (!inTableView ? " active" : ""), onClick: function () { _this.props.customerSearch.setState({ 'viewType': 'cards' }); } }, "Cards View")),
                React.createElement("div", { className: "input-group input-group-sm " + styles.searchMenu },
                    React.createElement("div", { className: "input-group-prepend" },
                        React.createElement("span", { className: "input-group-text", id: "basic-addon1" }, "Search")),
                    React.createElement("input", { type: "text", className: "form-control form-control-sm", placeholder: "", defaultValue: "A", onChange: function (event) {
                            var customerService = _this.props.customerSearch.state.customerService;
                            var searchString = event.target.value;
                            if (searchString != "") {
                                customerService.getCustomersByLastName(searchString).then(function (customers) {
                                    _this.props.customerSearch.setState({ customers: customers, loading: false });
                                });
                            }
                            else {
                                _this.props.customerSearch.setState({ customers: [], loading: false });
                            }
                        } })))));
    };
    return CustomersToolbar;
}(React.Component));
export default CustomersToolbar;
//# sourceMappingURL=CustomersToolbar.js.map