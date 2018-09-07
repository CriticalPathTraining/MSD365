import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import LeadTracker from './components/LeadTracker';
import { ILeadTrackerProps } from './components/ILeadTrackerProps';

import { SPHttpClient } from '@microsoft/sp-http';


import ILead from '../../models/ILead';
import IList from '../../models/IList';
import ILeadsService from '../../models/ILeadsService';
import SharePointLeadsService from '../../services/SharePointLeadsService';


export interface ILeadTrackerWebPartProps {
  targetList: string;
}

export default class LeadTrackerWebPart extends BaseClientSideWebPart<ILeadTrackerWebPartProps> {

  private leadTracker: LeadTracker;


  private listOptions: IPropertyPaneDropdownOption[];
  private listsFetched: boolean = false;

  private fetchListOptions(): Promise<IPropertyPaneDropdownOption[]> {

    let leadsService: ILeadsService =
      new SharePointLeadsService(
        this.context.spHttpClient,
        this.context.pageContext.web.absoluteUrl
      );


    return leadsService.getLeadsLists().then((lists: IList[]) => {
      var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
      lists.map((list: IList) => {
        options.push({ key: list.title, text: list.title });
      });
      return options;
    });
  }


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

  protected onPropertyPaneConfigurationStart(): void {
    console.log("onPropertyPaneConfigurationStart");
    if (this.listsFetched) {
      return;
    }
    this.fetchListOptions().then((options: IPropertyPaneDropdownOption[]) => {
      this.listOptions = options;
      this.listsFetched = true;
      this.context.propertyPane.refresh();
      this.render();
    });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    console.log("onPropertyPaneFieldChanged");
    if (propertyPath === 'targetList' && newValue) {
      console.log("target list updated: " + newValue);
      this.leadTracker.setState({ targetList: newValue });
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "List Tracker Properties" },
          groups: [{
            groupName: "Data source",
            groupFields: [
              PropertyPaneDropdown(
                "targetList", {
                  label: "Select a Contacts list",
                  options: this.listOptions,
                  disabled: !this.listsFetched
                }),
            ]
          }
          ]
        }
      ]
    };
  }
}
