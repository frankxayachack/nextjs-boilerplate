const passport = require('passport');
const passportJwt = require('passport-jwt');
const passportLocal = require('passport-local');
const User = require('../db/model').User;

const { ExtractJwt, StrategyOptions } = passportJwt;
const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	User.findOne({
		where: { email }
	})
		.then(user => {
			User.build(user).comparePassword(password, user.password, (err, isMatch) => {
				if (err) return done(err);
				if (!isMatch) return done(null, false);
				return done(null, user);
			});
		})
		.catch(err => {
			console.error(err);
			throw err;
		});
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: 'yourJWTsecret'
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub).then(user => {
		if (user === null) {
			done(null, false);
		}
		done(null, user);
	});
});

const strats = {
	localLogin,
	jwtLogin
};

module.exports = strats;
