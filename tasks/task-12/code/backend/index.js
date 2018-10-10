require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const cron = require('cron');

const users = require('./routes/users');
const websites = require('./routes/websites');
const statusJob = require('./workers/uptime')(cron);

const app = express();

app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'test') {
	app.use(logger('tiny'));
	statusJob.start();
};

app.use(passport.initialize());

require('./passport/')(passport);

app.use('/users', users);
app.use('/websites', websites);

app.get('/', (req, res) => {
	res.json({ success: true })
});

app.listen(3001, () => console.log('Listening on Port 3001'));

module.exports = app;