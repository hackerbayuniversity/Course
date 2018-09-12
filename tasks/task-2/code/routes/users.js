const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// We create our router
const router = express.Router();
// We import the User model
const User = require('../models/User');

// Our API is now here
router.post('/signup', (req, res) => {
	// Here we create our new user from the request body
	let newUser = {
		email: req.body.email,
		password: req.body.password
	}

	// We look for an user with the same email we are receiving from the request body
	User.findOne({ where: { email: newUser.email }})
	.then(user => {
		// If we find a user with the same email we return an error
		if(user) return res.status(401).json({ msg: 'Email already exists' })
		// If not we continue and create the new user
		else {
			User.create(newUser)
			// Here we return the user to client.
			.then(user => {
				// The token takes a payload that can contain any information you want.
				let payload = {
					email: user.email
				}
				// For now our secret is fine, but for future projects should protect
				// your secret and not expose it like this.
				jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
					// Here we send the token to the client.
					res.json({session: token})
				})
			})
				}
	})
	// Our error catcher
	.catch(err => res.status(401).json(err));
});

router.post('/login', (req, res) => {
	// We create our user object
	let newUser = {
		email: req.body.email,
		password: req.body.password
	}

	// Check if the user's email exists in the database
	User.findOne({ where: { email: newUser.email }})
	.then(user => {
		//If it does check the password
		if(user) {
			// compare takes the plain text password and the hash stored in our database
			bcrypt.compare(newUser.password, user.password)
			.then(isMatch => {
				// If the password is correct then return the token
				if(isMatch) {
					let payload = { email: user.email }
					jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
						res.json({session: token})
					})
				}
				// If the password is wrong return the corresponding message
				else {
					res.status(401).json({error: 'Invalid Password'})
				}
			})
		}
		// If the email doesn't exists then return the corresponding message
		else {
			res.status(404).json({error: 'User does not exist.'})
		}
	})
	.catch(err => res.status(401).json(err));
})

// We export it so index.js can use it
module.exports = router;