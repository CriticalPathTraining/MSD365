import * as React from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Link, match } from 'react-router-dom'

import App from './../App';

import './ViewUsers.css';

import { User } from '@microsoft/microsoft-graph-types';
import GraphClient from "./../../services/GraphClient";

interface ViewUsersProperties {
}

interface ViewUsersState {
  users: User[];
  loading: boolean;
}

export default class ViewUsers extends React.Component<ViewUsersProperties, ViewUsersState> {

  state = {
    users: [],
    loading: false
  };

  render() {
    return (
      <div id="view-users" className="content-body" >

        {this.state.loading ? <div className="loading" >&nbsp;</div> : null}

        {this.state.users.length > 0 ? (
          <div>
            <h3>Users</h3>
            <table id="users-table"
              className="customers-table table table-striped table-bordered table-hover table-sm">
              <thead className="thead-dark">
                <tr>
                <th>Display Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>ID</th>
                  <th>Mail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user: User) =>
                  <tr key={user.id} >
                    <td>{user.displayName}</td>
                    <td>{user.givenName}</td>
                    <td>{user.surname}</td>
                    <td>{user.id}</td>
                    <td>{user.mail}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUsers();
  }

  getUsers = () => {
    GraphClient.GetUsers().then((users: User[]) => {
      this.setState({ users: users, loading: false });
    });
  }
}
