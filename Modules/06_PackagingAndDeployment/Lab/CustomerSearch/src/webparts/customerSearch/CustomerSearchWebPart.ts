import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CustomerSearchWebPartStrings';
import CustomerSearch from './components/CustomerSearch';
import { ICustomerSearchProps } from './components/ICustomerSearchProps';

export interface ICustomerSearchWebPartProps {
  description: string;
}

export default class CustomerSearchWebPart extends BaseClientSideWebPart<ICustomerSearchWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomerSearchProps > = React.createElement(
      CustomerSearch,
      {
        httpClient: this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
