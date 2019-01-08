import * as React from 'react';
import './view2.scss';

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


export default class View2 extends React.Component<any, any> {
  render() {
    return (
      <div id="view2">
        <h4>Details List</h4>
        <div>
          <DetailsList
            items={leads}
            columns={leadColumns}
            setKey='set'
            layoutMode={DetailsListLayoutMode.fixedColumns}
          />
        </div>
      </div>
    );
  }
}

const leads = [
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