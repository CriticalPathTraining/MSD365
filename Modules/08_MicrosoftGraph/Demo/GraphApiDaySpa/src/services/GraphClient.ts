import SpaAuthService from "./SpaAuthService";

import * as MicrosoftGraph from '@microsoft/microsoft-graph-client';
import { ImplicitMSALAuthenticationProvider }  from "@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider";
import * as MicrosoftGraphTypes from '@microsoft/microsoft-graph-types';

export default class GraphClient {

  private static createClient(): MicrosoftGraph.Client {
    let authProvider = new ImplicitMSALAuthenticationProvider(SpaAuthService.userAgent, SpaAuthService.requestScopes);
    return MicrosoftGraph.Client.initWithMiddleware({authProvider});
}

  static GetCurrentUser = async (): Promise<MicrosoftGraphTypes.User> => {
    let client = GraphClient.createClient();
    return await client.api('/me').get();
  }

  static GetUsers = async (): Promise<MicrosoftGraphTypes.User[]> => {
    let client = GraphClient.createClient();
    return await client.api('/users').get()
      .then(response => { return response.value; });
  }

  static GetOrganizationDetails = async (): Promise<MicrosoftGraphTypes.Organization> => {
    let client = GraphClient.createClient();
    return (await client.api('/organization').get()).value[0];
  }
}
