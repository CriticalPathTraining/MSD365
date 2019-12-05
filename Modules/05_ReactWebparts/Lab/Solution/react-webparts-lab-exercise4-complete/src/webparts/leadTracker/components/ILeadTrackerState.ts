import ILead from '../../../models/ILead';

export interface ILeadTrackerState {
  targetList: string;
  loading: boolean;
  leads: ILead[];
}
