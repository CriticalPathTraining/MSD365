import * as React from 'react';
import { withRouter, RouteComponentProps, Route, Switch, Link, match } from 'react-router-dom'

import App from './../App'

import { Organization } from '@microsoft/microsoft-graph-types';
import GraphClient from "./../../services/GraphClient";

interface ViewOrganizationProperties {
}

interface ViewOrganizationState {
    organization: Organization;
    loading: boolean;
}

export default class ViewCurrentUser extends React.Component<ViewOrganizationProperties, ViewOrganizationState> {

    state = {
        organization: {
            id: "", displayName: ""
        },
        loading: false
    };

    render() {
        return (
            <div id="view-users" className="content-body" >

                { this.state.loading ? <div className="loading" >&nbsp;</div> : null}

                { this.state.organization.id !== "" ? (
                    <div id="view-organization" className="content-body" >
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border">Current User Profile</legend>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="objectId">Object ID:</label>
                                    <input type="text" className="form-control" id="objectId" readOnly value={this.state.organization.id} ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="displayName">Display Name:</label>
                                    <input type="text" className="form-control" id="displayName" readOnly value={this.state.organization.displayName} />
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
        this.getOrganization();
    }

    getOrganization = () => {
        GraphClient.GetOrganizationDetails().then((organization: Organization) => {
            console.log("Organization", organization);
            this.setState({ organization: organization, loading: false });
        });
    }
}
