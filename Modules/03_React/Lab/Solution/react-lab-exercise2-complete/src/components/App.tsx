import * as React from 'react';

import Banner from "./Banner";
import TopNav from "./TopNav";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './App.css';

export default class App extends React.Component<any, any> {

  render() {
    return (
      <div id="page-container" className="container">
        <Banner appTitle="React Lab App" >
          <TopNav />
        </Banner>
        <div className="jumbotron">
          <div>TODO: Add Content</div>
        </div>
      </div>
    );
  }

}
