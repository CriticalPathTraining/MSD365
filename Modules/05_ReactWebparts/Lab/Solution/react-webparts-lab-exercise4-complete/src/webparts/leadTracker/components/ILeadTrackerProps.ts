import { SPHttpClient } from '@microsoft/sp-http';

export interface ILeadTrackerProps {
  targetList: string;
  siteUrl: string;
  spHttpClient: SPHttpClient | undefined;
}
