import * as React from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Link, match } from 'react-router-dom'

import App from './../App'

import MicrosoftGraphService, { IGraphUser } from "./../../services/MicrosoftGraphService";

interface ViewCurrentUserProperties {
}

interface ViewCurrentUserState {
    currentUser: IGraphUser;
    loading: boolean;
}

export default class ViewCurrentUser extends React.Component<ViewCurrentUserProperties, ViewCurrentUserState> {

    state = {
        currentUser: {
            id: "", displayName: "", givenName: "", surname: "", userPrincipalName: "", jobTitle: "", mail: ""
        },
        loading: false
    };

    render() {
        return (
            <div id="view-users" className="content-body" >

                { this.state.loading ? <div className="loading" >&nbsp;</div> : null}

                { this.state.currentUser.id !== "" ? (
                    <div id="view-currentUser" className="content-body" >
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Current User Profile</legend>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="objectId">Object ID:</label>
                                    <input type="text" className="form-control" id="objectId" readOnly value={this.state.currentUser.id} ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPrincipalName">User Principal Name:</label>
                                    <input type="text" className="form-control" id="userPrincipalName" readOnly value={this.state.currentUser.userPrincipalName} ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="displayName">Display Name:</label>
                                    <input type="text" className="form-control" id="displayName" readOnly value={this.state.currentUser.displayName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="givenName">First Name:</label>
                                    <input type="text" className="form-control" id="givenName" readOnly value={this.state.currentUser.givenName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="surname">Last Name:</label>
                                    <input type="text" className="form-control" id="surname" readOnly value={this.state.currentUser.surname} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobTitle">Job Title:</label>
                                    <input type="text" className="form-control" id="surname" readOnly value={this.state.currentUser.jobTitle} />
                                </div>
                            </form>
                        </fieldset>
                    </div>
                ) : null}

            </div>
        );
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getUser();
    }

    getUser = () => {
        MicrosoftGraphService.GetCurrentUser().then((user: IGraphUser) => {
            console.log("User", user);
            this.setState({ currentUser: user, loading: false });
        });
    }
}
