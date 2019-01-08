import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './TopNav.scss';

export default class TopNav extends React.Component<any, any> {
  render() {
    return (
      <div id="top-nav">
        <ul className="navbar-nav" >
          <li className="nav-item" >
            <NavLink exact to="/" className="navbar-link" activeClassName="active-nav-link" >
              Home
              </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink exact to="/view1" className="navbar-link" activeClassName="active-nav-link" >
              View 1
              </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink exact to="/view2" className="navbar-link" activeClassName="active-nav-link" >
              View 2
              </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink exact to="/view3" className="navbar-link" activeClassName="active-nav-link" >
              View 3
              </NavLink>
          </li>
          <li className="nav-item" >
            <NavLink exact to="/view4" className="navbar-link" activeClassName="active-nav-link" >
              View 4
              </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}
