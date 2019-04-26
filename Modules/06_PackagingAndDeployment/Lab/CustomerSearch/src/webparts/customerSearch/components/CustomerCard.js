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
import styles from './CustomerCard.module.scss';
var CustomerCard = (function (_super) {
    __extends(CustomerCard, _super);
    function CustomerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerCard.prototype.render = function () {
        return (React.createElement("div", { className: styles.customerCard },
            React.createElement("div", { className: styles.cardHeader }, this.props.customer.FirstName + " " + this.props.customer.LastName),
            React.createElement("div", { className: styles.cardBody },
                React.createElement("div", { className: styles.cardText },
                    "Work Phone: ",
                    React.createElement("strong", null, this.props.customer.WorkPhone)),
                React.createElement("div", { className: styles.cardText },
                    "Home Phone: ",
                    React.createElement("strong", null, this.props.customer.HomePhone)))));
    };
    return CustomerCard;
}(React.Component));
export default CustomerCard;
//# sourceMappingURL=CustomerCard.js.map