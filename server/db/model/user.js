'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			hooks: {
				beforeCreate: (user, options) => {
					// ask bcrypt to hash our password, and use a generated salt after 10 rounds
					// then take the password and apply it to the user object
					return bcrypt.hash(user.password, bcrypt.genSaltSync(10)).then(hashPw => {
						user.password = hashPw;
					});
				}
			}
		}
	);
	User.associate = function(models) {
		// associations can be defined here
	};
	return User;
};
