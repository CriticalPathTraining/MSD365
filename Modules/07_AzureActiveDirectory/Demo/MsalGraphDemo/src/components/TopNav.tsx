import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import "./TopNav.css"

export default class TopNav extends React.Component<any, any> {

  render() {
    return (
      <div id="top-nav" className="navbar-collapse collapse" >
        <nav>
          <ul className="nav navbar-nav" >
            <li className="nav-item" >
              <NavLink exact to="/currentUser" className="navbar-link" activeClassName="active-nav-link" >
                Current User
              </NavLink>
            </li>
            <li className="nav-item" >
              <NavLink exact to="/organization" className="navbar-link" activeClassName="active-nav-link" >
                Organization
              </NavLink>
            </li>

            <li className="nav-item" >
              <NavLink exact to="/users" className="navbar-link" activeClassName="active-nav-link" >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

}
