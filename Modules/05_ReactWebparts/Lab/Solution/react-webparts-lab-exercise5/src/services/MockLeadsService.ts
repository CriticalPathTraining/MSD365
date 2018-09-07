import ILead from "../models/ILead";
import IList from "../models/IList";
import ILeadsService from "../models/ILeadsService";

export default class MockLeadsService implements ILeadsService {

  public getLeads(targetList: string): Promise<ILead[]> {
    return Promise.resolve(this.leads);
  }

  public getLeadsLists(): Promise<IList[]> {
    return Promise.resolve(this.lists);
  }

  private lists: IList[] = [
    { id: "list01", title: "Northern Leads" },
    { id: "list02", title: "Southern Leads" }
  ];

  private leads: ILead[] = [
    {
      "id": "1",
      "firstName": "Darwin",
      "lastName": "Collins",
      "company": "Trioptimum Corp",
      "emailAddress": "Darwin.Collins@TrioptimumCorp.com"
    },
    {
      "id": "2",
      "firstName": "Chrystal",
      "lastName": "Santiago",
      "company": "Crudgington Brewery",
      "emailAddress": "Chrystal.Santiago@CrudgingtonBrewery.com"
    },
    {
      "id": "3",
      "firstName": "Kasey",
      "lastName": "Quinne",
      "company": "ComTron",
      "emailAddress": "Kasey.Morgan@ComTron.com"
    },
    {
      "id": "4",
      "firstName": "Kris",
      "lastName": "Knox",
      "company": "Crudgington Brewery",
      "emailAddress": "Kris.Knox@CrudgingtonBrewery.com"
    },
    {
      "id": "5",
      "firstName": "Waylon",
      "lastName": "Parks",
      "company": "New York Inquirer",
      "emailAddress": "Waylon.Parks@NewYorkInquirer.com"
    },
    {
      "id": "6",
      "firstName": "Glenda",
      "lastName": "Yack",
      "company": "Grim Reaper Airways",
      "emailAddress": "Glenda.Montoya@GrimReaperAirways.com"
    },
    {
      "id": "7",
      "firstName": "Margo",
      "lastName": "Zuckerberg",
      "company": "Liandri Mining Corp",
      "emailAddress": "Margo.McMahon@LiandriMiningCorp.com"
    },
    {
      "id": "8",
      "firstName": "Kitty",
      "lastName": "Akers",
      "company": "VersaLife Corporation",
      "emailAddress": "Kitty.Herrera@VersaLifeCorporation.com"
    }
  ];

}