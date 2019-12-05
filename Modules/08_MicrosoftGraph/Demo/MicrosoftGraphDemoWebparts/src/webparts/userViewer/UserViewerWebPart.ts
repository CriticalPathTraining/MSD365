import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';

import UserViewer from './components/UserViewer';
import { IUserViewerProps } from './components/IUserViewerProps';

import { MSGraphClient } from "@microsoft/sp-http";

export default class UserViewerWebPart extends BaseClientSideWebPart<any> {

  public render(): void {

    this.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        // create React component by passing MSGraphClient
        const element: React.ReactElement<IUserViewerProps> = React.createElement(
          UserViewer, { msGraphClient: client }
        );
        ReactDom.render(element, this.domElement);
      });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

}
