import SpaAuthService from "./SpaAuthService";
import IGraphUser from "./../models/IGraphUser";
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
  