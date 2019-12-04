import * as React from 'react';

import "./TopNav.css";

export default class TopNav extends React.Component<any, any> {

  render() {
    return (
      <div id="top-nav" className="navbar-collapse collapse" >
        <nav>
          <ul className="nav navbar-nav" >
            <li className="nav-item" ><a href="#">Home</a></li>
            <li className="nav-item" ><a href="#">Customers</a></li>
            <li className="nav-item" ><a href="#">About</a></li>
          </ul>
        </nav>
      </div>
    );
  }

}
