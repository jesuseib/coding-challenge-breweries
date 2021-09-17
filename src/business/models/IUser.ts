export interface IUser {
  id: string;
  username: string;
  password: string;

  isValidPassword(password: string): boolean;
}
