import * as React from 'react';
import styles from './UserPersonaCard.module.scss';

import IUser from "./../../../models/IUser";
import IUsersService from "./../../../models/IUsersService";

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';

export interface IUserPersonaCardProps {
  defaultUser: IUser;
  usersService: IUsersService;
}

export interface IUserPersonaCardState {
  user: IUser;
}

export default class UserPersonaCard extends React.Component<IUserPersonaCardProps, IUserPersonaCardState> {

  public state = {
    user: this.props.defaultUser
  };

  public render(): React.ReactElement<IUserPersonaCardProps> {
    return (
      <div className={styles.userPersonaCard}>
        <Persona
          primaryText={this.state.user.displayName}
          imageUrl={this.state.user.photo}
          size={PersonaSize.size48}
          onRenderSecondaryText={() => (
            <div>{this.state.user.email}</div>
          )}
        />
      </div>
    );
  }

  public componentDidMount(): void {
    this.props.usersService.getUserPhoto(this.state.user.id).then((urlPhoto: string) => {
      let user = this.state.user;
      user.photo = urlPhoto;
      this.setState({ user: user });
    });

  }
}
