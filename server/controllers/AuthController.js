const User = require('../db/model').User;

class AuthController {
	signup(req, res, next) {
		let { firstName, lastName, email, password } = req.body;
		email = email.toLowerCase();
		User.findOne({
			where: { email }
		}).then(user => {
			//if the user exists already
			if (user !== null) {
				return res.status(422).json({ error: true, message: 'cannot create user' });
			}

			// other the user doesn't exist, we should create one
			User.create({
				firstName,
				lastName,
				email,
				password
			}).then(user => {
				res.json(user);
			});
		});
	}
}

module.exports = new AuthController();
