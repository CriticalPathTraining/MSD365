import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Banner from "./Banner";
import TopNav from "./Topnav";
import Login from "./Login";

import ViewHome from './ViewHome/ViewHome';
import ViewCurrentUser from './ViewCurrentUser/ViewCurrentUser';
import ViewUsers from './ViewUsers/ViewUsers';

import SpaAuthService from "./../services/SpaAuthService";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';

import IUser from "./../models/IUser";

export interface AppState {
  user: IUser;
}

export default class App extends React.Component<any, AppState> {

  state: AppState = {
    user: {
      IsAuthenticated: false,
      DisplayName: "",
      login: () => { this.loginUser(); },
      logout: () => { this.logoutUser(); }
    }
  };

  loginUser = () => {
    SpaAuthService.login();
  };

  logoutUser = () => {
    SpaAuthService.logout();
    this.setState({
      user: {
        IsAuthenticated: false,
        DisplayName: "",
        login: this.state.user.login,
        logout: this.state.user.logout
      }
    });
  };


  render() {

    return (
      <div id="page-container" className="container">

        <Banner appTitle="Graph API Day SPA" >
          {this.state.user.IsAuthenticated ? <TopNav /> : null}
          <Login user={this.state.user} />
        </Banner>

        <Switch>
          <Route path="/" exact component={ViewHome} />
          <Route path="/currentUser/" render={() => <ViewCurrentUser />} />
          <Route path="/users/:id?" render={() => <ViewUsers />} />
        </Switch>

      </div>);
  }

  componentDidMount() {
    SpaAuthService.uiUpdateCallback = this.onAuthenticationComplete; 
    SpaAuthService.init();
  }

  onAuthenticationComplete = (userIsAuthenticated: boolean) => {
    if (SpaAuthService.userIsAuthenticated) {
      console.log(SpaAuthService.userName + " has been authenticated");
      this.setState({
        user: {
          IsAuthenticated: true,
          DisplayName: SpaAuthService.userDisplayName,
          login: this.state.user.login,
          logout: this.state.user.logout
        }
      });
    }
  };

} 