import * as React from 'react';
import styles from './LeadTracker.module.scss';
import { ILeadTrackerProps } from './ILeadTrackerProps';
import { ILeadTrackerState } from './ILeadTrackerState';
import { escape } from '@microsoft/sp-lodash-subset';

import ILead from '../../../models/ILead';
import IList from '../../../models/IList';
import ILeadsService from '../../../models/ILeadsService';
import MockLeadsService from '../../../services/MockLeadsService';
import SharePointLeadsService from '../../../services/SharePointLeadsService';


import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode
} from 'office-ui-fabric-react';

const leadColumns: IColumn[] = [
  { key: 'id', fieldName: 'id', name: 'ID', minWidth: 12, maxWidth: 24 },
  { key: 'firstName', fieldName: 'firstName', name: 'First Name', minWidth: 24, maxWidth: 64 },
  { key: 'lastName', fieldName: 'lastName', name: 'Last Name', minWidth: 24, maxWidth: 64 },
  { key: 'company', fieldName: 'company', name: 'Company', minWidth: 64, maxWidth: 120 },
  { key: 'emailAddress', fieldName: 'emailAddress', name: 'Email', minWidth: 100, maxWidth: 240 }
];

export default class LeadTracker extends React.Component<ILeadTrackerProps, ILeadTrackerState> {

  private leadsService: ILeadsService =
    new SharePointLeadsService(this.props.spHttpClient, this.props.siteUrl);

  public state: ILeadTrackerState = {
    targetList: this.props.targetListDefault,
    loading: false,
    leads: []
  };

  public render(): React.ReactElement<ILeadTrackerProps> {
    return (
      <div className={styles.leadTracker}>

        {(this.state.targetList === "") ?
          <div className={styles.messageContainer} >Select a list from the web part property pane</div> :
          (this.state.loading) ?
            <div className={styles.loadingContainer} >Calling to the SharePoint REST API</div> :
            <DetailsList
              items={this.state.leads}
              columns={leadColumns}
              setKey='set'
              layoutMode={DetailsListLayoutMode.fixedColumns}
            />
        }

      </div>
    );
  }

  public componentDidMount() {
    this.setState({ loading: true });
    this.leadsService.getLeads(this.state.targetList).then((leads: ILead[]) => {
      this.setState({ leads: leads, loading: false });
    });
  }

  public componentDidUpdate(prevProps: ILeadTrackerProps, prevState: ILeadTrackerState, prevContext: any): void {
    if (prevState.targetList != this.state.targetList) {
      this.setState({ loading: true });
      this.leadsService.getLeads(this.state.targetList).then((leads: ILead[]) => {
        this.setState({ leads: leads, loading: false });
      });
    }
  }
}