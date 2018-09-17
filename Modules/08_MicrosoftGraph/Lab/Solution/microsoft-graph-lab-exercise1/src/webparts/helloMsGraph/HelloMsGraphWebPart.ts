import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import HelloMsGraph from './components/HelloMsGraph';
import { IHelloMsGraphProps } from './components/IHelloMsGraphProps';

import { MSGraphClient } from '@microsoft/sp-http';

export default class HelloMsGraphWebPart extends BaseClientSideWebPart<any> {

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

}
