import SpaAuthService from "./SpaAuthService";

export interface IGraphUser {
  id: string;
  displayName: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  jobTitle: string;
  mail: string;
}

export interface IGraphOrganization {
  id: string;
  displayName: string;
}

export default class MicrosoftGraphService {

  static apiRoot: string = "https://graph.microsoft.com/v1.0/";

  static GetCurrentUser = async (): Promise<IGraphUser> => {
    var restUrl: string = MicrosoftGraphService.apiRoot + "me/";
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + (await SpaAuthService.getAcessToken())
      }
    }).then(response => response.json())
      .then(response => { return response; });
  }

  static GetOrganizationDetails = async (): Promise<IGraphOrganization> => {
    var restUrl: string = MicrosoftGraphService.apiRoot + "organization/";
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + (await SpaAuthService.getAcessToken())
      }
    }).then(response => response.json())
      .then(response => { return response.value[0]; });
  }

  static GetUsers = async (): Promise<IGraphUser[]> => {
    var restUrl: string = MicrosoftGraphService.apiRoot + "users/";
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + (await SpaAuthService.getAcessToken())
      }
    }).then(response => response.json())
      .then(response => { return response.value; });
  }
  
}
