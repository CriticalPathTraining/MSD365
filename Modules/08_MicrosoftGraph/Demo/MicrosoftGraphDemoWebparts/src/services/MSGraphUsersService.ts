import IUser from "../models/IUser";
import IUsersService from "../models/IUsersService";

import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export default class MSGraphUsersService implements IUsersService {

  constructor(private msGraphClient: MSGraphClient) { }

  public getCurentUser(): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      this.msGraphClient
        .api("me")
        .get((error: any, user: MicrosoftGraph.User, rawResponse?: any) => {
          // map response to IUser object
          return resolve(<IUser>({
            id: user.id,
            displayName: user.givenName + " " + user.surname,
            email: user.mail,
            phone: user.businessPhones[0]
          }));
        });
    });
  }

  public getCurentUserPhoto(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.msGraphClient
        .api('/me/photo/$value')
        .responseType('blob')
        .get((err: any, photoResponse: any, rawResponse: any) => {
          console.log("Hi from here 6");
          const blobUrl = window.URL.createObjectURL(photoResponse);
          console.log(blobUrl);
          resolve(blobUrl);
        });
    });
  }

  public getUsers(): Promise<IUser[]> {
    console.log("getUsers()");
    return new Promise<IUser[]>((resolve, reject) => {
      this.msGraphClient
        .api("users")
        .get((error: any, usersResponse: any, rawResponse?: any) => {
          let users: any = usersResponse.value;
          console.log(users);
          let usersMapped: any = users.map((user: MicrosoftGraph.User) => <IUser>({
            id: user.id,
            displayName: user.givenName + " " + user.surname,
            email: user.mail,
            phone: user.businessPhones[0],
            photo: ''
          }));
          console.log(usersMapped);


          resolve(usersMapped);
        });
    });
  }

  public getUserPhoto(id: string): Promise<string> {
    const restUrl = `/users/${id}/photo/$value`;
    return new Promise<string>((resolve, reject) => {
      this.msGraphClient
        .api(restUrl)
        .responseType('blob')
        .get((err: any, photoResponse: any, rawResponse: any) => {
          console.log("Hi from here 6");
          const blobUrl = window.URL.createObjectURL(photoResponse);
          console.log(blobUrl);
          resolve(blobUrl);
        });
    });
  }


}