const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const users = require('./routes/users');
const websites = require('./routes/websites');

const app = express();

app.use(bodyParser.json());
app.use(logger('tiny'));

app.use(passport.initialize());

require('./passport/')(passport);

app.use('/users', users);
app.use('/websites', websites);

app.get('/', (req, res) => {
	res.json({ success: true })
});

app.listen(3001, () => console.log('Listening on Port 3001'));