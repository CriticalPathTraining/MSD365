import * as React from 'react';
import styles from './UserViewer.module.scss';
import { IUserViewerProps } from './IUserViewerProps';

import IUser from "./../../../models/IUser";
import IUsersService from "./../../../models/IUsersService";

import MSGraphUsersService from "./../../../services/MSGraphUsersService";
import UserPersonaCard, { IUserPersonaCardProps } from './UserPersonaCard';

export interface IUserViewerState {
  users: IUser[];
}

export default class UserViewer extends React.Component<IUserViewerProps, IUserViewerState> {

  private usersService: IUsersService = new MSGraphUsersService(this.props.msGraphClient);

  public state = {
    users: []
  };

  public render(): React.ReactElement<IUserViewerProps> {
    return (
      <div className={styles.userViewer}>
        {this.state.users.length == 0 ? (
          <div>No users to display</div>
        ) : (
            <div>{this.state.users.map((user: IUser) => (
              <UserPersonaCard defaultUser={user} usersService={this.usersService} />
            ))}
            </div>
          )
        }
      </div>
    );
  }

  public componentDidMount(): void {
    console.log("componentDidMount");
    this.usersService.getUsers().then((users: IUser[]) => {
      this.setState({ users: users });
    });

  }
}
