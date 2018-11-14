import * as React from 'react';
import styles from './HelloMsGraph.module.scss';
import { IHelloMsGraphProps } from './IHelloMsGraphProps';

import IUser from "./../../../models/IUser";
import IUsersService from "./../../../models/IUsersService";
import MSGraphUsersService from "./../../../services/MSGraphUsersService";

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';

export interface IHelloMsGraphState {
  user: IUser;
}

export default class HelloMsGraph extends React.Component<IHelloMsGraphProps, IHelloMsGraphState> {

  public state = { user: { id: '', displayName: '', email: '', phone: '', photo: '' } };

  private usersService: IUsersService = new MSGraphUsersService(this.props.msGraphClient);

  public render(): React.ReactElement<IHelloMsGraphProps> {
    return (
      <div className={styles.HelloMSGraph} >
        <Persona primaryText={this.state.user.displayName}
          secondaryText='Personal Details:'
          onRenderTertiaryText={() => (
            <ul>
              <li>email: {this.state.user.email}</li>
              <li>Phone: {this.state.user.phone}</li>
            </ul>
          )}
          imageUrl={this.state.user.photo}
          size={PersonaSize.size100} />
      </div>
    );
  }

  public componentDidMount(): void {

    this.usersService.getCurentUser().then((usersService: IUser) => {
      this.setState({ user: usersService });
    });

    this.usersService.getCurentUserPhoto().then((urlPhoto: string) => {
      let currentUser: IUser = this.state.user;
      currentUser.photo = urlPhoto;
      this.setState({ user: currentUser });
    });

  }

}
