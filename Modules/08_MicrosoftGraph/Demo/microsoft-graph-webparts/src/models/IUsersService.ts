import IUser from "./IUser";

export default interface IUsersService {
  getCurentUser(): Promise<IUser>;
  getCurentUserPhoto(): Promise<string>;
  getUsers(): Promise<IUser[]>;
  getUserPhoto(id: string): Promise<string>;
}