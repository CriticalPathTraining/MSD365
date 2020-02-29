import * as React from 'react';
import './ViewHome.css';

export default class ViewHome extends React.Component<any, any> {
  render() {
    return (
      <div id="view-home" className="content-body" >
        <div className="row">
          <div className="jumbotron col">
            <h3>MSAL Graph Demo App</h3>
            <p>This is a demo of a single page application (SPA) that uses React.js, 
               the Microsoft Authenitcation Library (MSAL) and the the Microsft Graph API.</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Microsoft Authenitcation Library</h4>
            <div>The Microsoft Authenitcation Library (MSAL) provides the code to 
            implement the OAuth2 implicit grant flow and acquire access tokens.
            </div>
          </div>
          <div className="col">
            <h4>Microsoft Graph API</h4>
            <div>The Microsft Graph API allows you to interact with Office 365 objects such as users, files, sites and organizations.</div>
          </div>
        </div>
      </div>
    );
  }
}
