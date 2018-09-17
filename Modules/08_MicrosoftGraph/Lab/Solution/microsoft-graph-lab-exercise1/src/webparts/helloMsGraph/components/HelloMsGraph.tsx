import * as React from 'react';
import styles from './HelloMsGraph.module.scss';
import { IHelloMsGraphProps } from './IHelloMsGraphProps';

export interface IHelloMsGraphState {
  name: string;
  email: string;
  phone: string;
  image: string;
}

import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';

import { Link } from 'office-ui-fabric-react/lib/components/Link';

export default class HelloMsGraph extends React.Component<IHelloMsGraphProps, IHelloMsGraphState> {

  constructor(props: IHelloMsGraphProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      image: null
    };
  }

  private _renderMail = () => {
    if (this.state.email) {
      return <Link href={`mailto:${this.state.email}`}>{this.state.email}</Link>;
    } else {
      return <div />;
    }
  }

  private _renderPhone = () => {
    if (this.state.phone) {
      return <Link href={`tel:${this.state.phone}`}>{this.state.phone}</Link>;
    } else {
      return <div />;
    }
  }


  public render(): React.ReactElement<IHelloMsGraphProps> {
    return (
      <div className={styles.HelloMSGraph} >
        <Persona primaryText={this.state.name}
          secondaryText='Personal Details:'
          onRenderTertiaryText={() => (
            <ul>
              <li>email: {this.state.email}</li>
              <li>Phone: {this.state.phone}</li>
            </ul>
          )}
          imageUrl={this.state.image}
          size={PersonaSize.size100} />
      </div>
    );
  }

  public componentDidMount(): void {

    this.props.graphClient
      .api("me")
      .get((error: any, user: MicrosoftGraph.User, rawResponse?: any) => {
        this.setState({
          name: user.displayName,
          email: user.mail,
          phone: user.businessPhones[0]
        });
      });

    this.props.graphClient
      .api('/me/photo/$value')
      .responseType('blob')
      .get((err: any, photoResponse: any, rawResponse: any) => {
        const blobUrl = window.URL.createObjectURL(photoResponse);
        this.setState({ image: blobUrl });
      });
  }

}
