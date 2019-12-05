import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'LeadTrackerWebPartStrings';
import LeadTracker from './components/LeadTracker';
import { ILeadTrackerProps } from './components/ILeadTrackerProps';

import { SPHttpClient } from '@microsoft/sp-http';

export default class LeadTrackerWebPart extends BaseClientSideWebPart<ILeadTrackerProps> {

  private leadTracker: LeadTracker;

  public render(): void {
    console.log("render: ", this.properties.targetList);
    const element: React.ReactElement<ILeadTrackerProps> = React.createElement(
      LeadTracker, {
        targetList: this.properties.targetList,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: <SPHttpClient>this.context.spHttpClient
      }
    );
    this.leadTracker = <LeadTracker>ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    console.log("onPropertyPaneFieldChanged", propertyPath, newValue)
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === 'targetList' && newValue) {
      this.leadTracker.setState({ targetList: newValue });
    }
  }
  
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        { header: { description: "List Tracker Properties" },
          groups: [ {
              groupName: "Data source",
              groupFields: [
                PropertyPaneTextField('targetList', { label: "Target List"})
              ]
            }
          ]
        }
      ]
    };
  }
  
}
