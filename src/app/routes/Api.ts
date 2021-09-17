import { Router } from 'express';
import passport from 'passport';
import { DependencyResolver } from '../DependencyResolver';

// Router to handle all the API requests
// we can have a another router to handle web requests (in case we were exposing static data / UI)
// or we can have another router to handle other services
const router = Router();

const breweriesController = DependencyResolver.getBreweryController();
router.get(
  '/breweries',
  passport.authenticate('basic', { session: false }),
  breweriesController.getBreweries.bind(breweriesController),
);

export default router;
