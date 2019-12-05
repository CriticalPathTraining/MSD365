import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'HelloMsGraphWebPartStrings';
import HelloMsGraph from './components/HelloMsGraph';
import { IHelloMsGraphProps } from './components/IHelloMsGraphProps';

export interface IHelloMsGraphWebPartProps {
  description: string;
}

export default class HelloMsGraphWebPart extends BaseClientSideWebPart<IHelloMsGraphWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        // create React component by passing MSGraphClient
        const element: React.ReactElement<IHelloMsGraphProps> = React.createElement(
          HelloMsGraph, { graphClient: client }
        );
        ReactDom.render(element, this.domElement);
      });
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
