import { Application } from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

import { User } from '../../business/models/User';
import Logger from '../../utils/logger/Logger';

class Passport {
  public mount(expressApp: Application): Application {
    expressApp = expressApp.use(passport.initialize());
    expressApp = expressApp.use(passport.session());

    // Strategies
    // to keep it simple, only the Basic Strategy is used in this code challenge
    // the username and password are hardcoded (you can set it in the .env file)
    this.mountBasicStrategy();
    // TODO: mount facebook/google/twitter strategies

    return expressApp;
  }

  mountBasicStrategy() {
    passport.use(
      new BasicStrategy((username, password, done) => {
        Logger.info(`Email is ${username}`);
        Logger.info(`Password is ${password}`);

        // at this point we should get the user from a database (ie: mongodb),
        // but to keep it simple the user is hardcoded
        const dbUser = new User();
        const isValidUsername = dbUser.username === username;
        const isValidPassword = dbUser.isValidPassword(password);
        if (isValidUsername && isValidPassword) {
          return done(null, dbUser);
        } else {
          return done(new Error('INVALID_USERNAME_OR_PASSWORD'));
        }
      }),
    );
  }
}

export default new Passport();
