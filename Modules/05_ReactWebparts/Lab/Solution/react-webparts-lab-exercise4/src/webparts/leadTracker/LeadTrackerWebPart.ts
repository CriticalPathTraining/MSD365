import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'LeadTrackerWebPartStrings';
import LeadTracker from './components/LeadTracker';
import { ILeadTrackerProps } from './components/ILeadTrackerProps';

import { SPHttpClient } from '@microsoft/sp-http';

export interface ILeadTrackerWebPartProps {
  targetList: string;
}

export default class LeadTrackerWebPart extends BaseClientSideWebPart<ILeadTrackerWebPartProps> {

  private leadTracker: LeadTracker;

  public render(): void {
    const element: React.ReactElement<ILeadTrackerProps> = React.createElement(
      LeadTracker, {
        targetListDefault: this.properties.targetList,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        spHttpClient: <SPHttpClient>this.context.spHttpClient
      }
    );
    this.leadTracker = <LeadTracker>ReactDom.render(element, this.domElement);
  }
  
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === 'targetList' && newValue) {
      this.leadTracker.setState({ targetList: newValue });
    }
  }
  

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
