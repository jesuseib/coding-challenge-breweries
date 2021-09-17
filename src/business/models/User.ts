// This file can be use to set the User Schema if we're using, for example, mongodb
import Locals from '../../inf/providers/Locals';
import { IUser } from './iuser';

export class User implements IUser {
  id: string = '123456789';
  username: string;
  password: string;

  constructor() {
    this.username = Locals.config().username; // hardcoded for simplification
    this.password = Locals.config().passowrd; // hardcoded for simplification
  }

  public isValidPassword(password: string): boolean {
    return this.password === password;
  }
}
