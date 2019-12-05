import * as React from 'react';
import styles from './LeadTracker.module.scss';
import { ILeadTrackerProps } from './ILeadTrackerProps';
import { ILeadTrackerState } from './ILeadTrackerState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class LeadTracker extends React.Component<ILeadTrackerProps, ILeadTrackerState> {

  public state: ILeadTrackerState = {
    targetList: this.props.targetListDefault,
    loading: false
  };

  public render(): React.ReactElement<ILeadTrackerProps> {
    return (
      <div className={styles.leadTracker}>
        <p>Target List: <strong>{escape(this.state.targetList)}</strong></p>
      </div>
    );
  }
}
