import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './WalmartGreeterWebPart.module.scss';
import * as strings from 'WalmartGreeterWebPartStrings';

export interface IWalmartGreeterWebPartProps {
  description: string;
}

export default class WalmartGreeterWebPart extends BaseClientSideWebPart<IWalmartGreeterWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = 
     `<div class="${styles.walmartGreeter}">
        <h1>Hello World of SPFx Webparts</h1>
      </div>`;
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
