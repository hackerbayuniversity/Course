const express = require('express');
const router = express.Router();
const models = require('../models/');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/list',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
	let pureToken = req.get('Authorization').slice(7)
	let currentUser = jwt.verify(pureToken, 'secret');

	models.Website.findAll({
		where: {
			UserId: currentUser.id
		}
	})
	.then(websites => res.json(websites))
	.catch(err => res.status(400).json({ msg: "Error" }))
})

router.post('/add',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {

	let pureToken = req.get('Authorization').slice(7)
	let currentUser = jwt.verify(pureToken, 'secret');

	if(req.body.constructor === Object && Object.keys(req.body).length === 0) return res.status(400).json({ msg: 'Invalid data' })

	let newWebsite = {
		name: req.body.name,
		url: req.body.url
	}

	models.User.findOne({ 
                where: {
                    id: currentUser.id
                }
            })
	.then(user => {
		if(!user) res.status(401).json({ msg:"User not found, please log in" })
		models.Website.find({
			where: {
				UserId: currentUser.id,
				url: newWebsite.url
			}
		})
		.then(website => {
			if(website) res.status(400).json({ msg: "Website already added" })
			else {
				models.Website.create(newWebsite)
				.then(website => {
				website.setUser(currentUser.id)
				res.json(website)
				})
				.catch(err => res.status(400).json(err))
			}
		})
	})
	.catch(err => res.status(401).send(err))
})

module.exports = router;