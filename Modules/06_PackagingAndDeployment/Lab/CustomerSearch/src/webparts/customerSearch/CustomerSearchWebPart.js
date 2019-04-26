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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import * as strings from 'CustomerSearchWebPartStrings';
import CustomerSearch from './components/CustomerSearch';
var CustomerSearchWebPart = (function (_super) {
    __extends(CustomerSearchWebPart, _super);
    function CustomerSearchWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerSearchWebPart.prototype.render = function () {
        var element = React.createElement(CustomerSearch, {
            httpClient: this.context.httpClient
        });
        ReactDom.render(element, this.domElement);
    };
    CustomerSearchWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(CustomerSearchWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    CustomerSearchWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return CustomerSearchWebPart;
}(BaseClientSideWebPart));
export default CustomerSearchWebPart;
//# sourceMappingURL=CustomerSearchWebPart.js.map