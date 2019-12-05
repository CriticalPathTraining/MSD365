import * as React from 'react';
import styles from './HelloMsGraph.module.scss';
import { IHelloMsGraphProps } from './IHelloMsGraphProps';
import { escape } from '@microsoft/sp-lodash-subset';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';

export interface IHelloMsGraphState {
  name: string;
  email: string;
  phone: string;
  image: string;
}


export default class HelloMsGraph extends React.Component<IHelloMsGraphProps, IHelloMsGraphState> {

  public state = {
    name: '',
    email: '',
    phone: '',
    image: ''
  };

  public render(): React.ReactElement<IHelloMsGraphProps> {
    return (
      <div className={styles.HelloMSGraph} >
        <Persona primaryText={this.state.name}
          secondaryText='Personal Details:'
          onRenderTertiaryText={ () => (
            <ul>
              <li>email: {this.state.email}</li>
              <li>Phone: {this.state.phone}</li>
            </ul>
          )}
          imageUrl={this.state.image}
          size={PersonaSize.size100}
        />
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
