const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const models = require('../models');
const router = express.Router();

router.post('/signup', (req, res) => {
	let newUser = {
		email: req.body.email,
		password: req.body.password
	}

	models.User.findOne({ where: { email: newUser.email }})
	.then(user => {
		if(user) return res.status(401).json({ msg: 'Email already exists' })
		else {
			models.User.create(newUser)
			.then(user => {
				let payload = {
					email: user.email,
					id: user.id
				}
				jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
					// Here we send the token to the client.
					res.json({session: token})
				})
			})
				}
	})
	.catch(err => res.status(401).json(err));
});

router.post('/login', (req, res) => {
	let newUser = {
		email: req.body.email,
		password: req.body.password
	}

	models.User.findOne({ where: { email: newUser.email }})
	.then(user => {
		if(user) {
			bcrypt.compare(newUser.password, user.password)
			.then(isMatch => {
				if(isMatch) {
					let payload = { email: user.email, id: user.id }
					jwt.sign(payload, 'secret', { expiresIn: '1h'}, (err, token) => {
						res.json({session: token})
					})
				}
				else {
					res.status(401).json({error: 'Invalid Password'})
				}
			})
		}
		else {
			res.status(404).json({error: 'User does not exist.'})
		}
	})
	.catch(err => res.status(401).json(err));
})

module.exports = router;