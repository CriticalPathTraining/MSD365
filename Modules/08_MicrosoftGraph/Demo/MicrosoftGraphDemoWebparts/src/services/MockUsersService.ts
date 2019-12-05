import IUser from "../models/IUser";
import IUsersService from "../models/IUsersService";

export default class MockUsersService implements IUsersService {

  public getCurentUser(): Promise<IUser> {
    return Promise.resolve(this.users[0]);
  }

  public getCurentUserPhoto(): Promise<string> {
    return Promise.resolve("");
  }

  public getUsers(): Promise<IUser[]> {
    return Promise.resolve(this.users);
  }

  public getUserPhoto(id: string): Promise<string> {
    return Promise.resolve("");
  }


  private users: IUser[] = [
    {
      "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeee000001",
      "displayName": "Darwin Collins",
      "email": "Darwin.Collins@ThisCompany.com",
      "phone": "(777)111-2222",
      "photo": ""
    },
    {
      "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeee000002",
      "displayName": "Chrystal Santiago",
      "email": "Chrystal.Santiago@ThisCompany.com",
      "phone": "(888)333-2222",
      "photo": ""
    },
    {
      "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeee000003",
      "displayName": "Kayne Quest",
      "email": "Kayne.Quest@ThisCompany.com",
      "phone": "(555)666-1111",
      "photo": ""
    },
    {
      "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeee000004",
      "displayName": "Dylan McFarland",
      "email": "Dylan.McFarland@ThisCompany.com",
      "phone": "(333)555-9999",
      "photo": ""
    }
  ];

}