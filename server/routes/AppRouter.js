const Router = require('express').Router;
const AuthController = require('../controllers/AuthController');

class AppRouter {
	constructor() {
		this.router = Router();
		this.buildRoutes();
	}

	buildRoutes() {
		this.router.post('/signup', AuthController.signup);
	}
}

const appRouter = new AppRouter();
module.exports = appRouter.router;
