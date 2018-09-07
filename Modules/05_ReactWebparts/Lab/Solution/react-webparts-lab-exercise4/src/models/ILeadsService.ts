import ILead from "./ILead";
import IList from "./IList";

export default interface ILeadsService {
  getLeads(targetList: string): Promise<ILead[]>;
  getLeadsLists(): Promise<IList[]>;
}