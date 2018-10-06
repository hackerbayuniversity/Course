process.env.NODE_ENV = 'test';

const app = require('../index');
let chai = require('chai');
let chaiHttp = require('chai-http');
const sinon = require('sinon');
const cron = require('cron');
let expect = chai.expect;

const sequelize = require('../db');
const models = require('../models');
const statusJob = require('../workers/uptime')(cron);

chai.use(chaiHttp);

let token = null;

let newUser = {
	email: 'test@mail.com',
	password: '123456'
}

describe('GET websites/list', () => {
	before(done => {
		sequelize.sync({ force: true })
		.then(() => {
			chai.request(app)
			.post('/users/signup')
			.send(newUser)
			.end((err, res) => {
				token = `Bearer ${res.body.session}`;
				statusJob.start();
				done();
			})

		})
		.catch(err => done(err));
	})

	it('should return empty array if there are no websites', done => {
		
		chai.request(app)
		.get('/websites/list')
		.set('Authorization', token)
		.end((err, res) => {
			expect(res.status).to.equal(200);
			expect(res.body).to.be.an('array').that.is.empty;
			done();
		})
	})

	describe('Adding website to the database', done => {

		before(done => {
			chai.request(app)
			.post('/websites/add')
			.set('Authorization', token)
			.send({
				name: 'test',
				url: 'www.test23251.com'
			})
			.end((err, res) => {
				done();
			})

		})

		it('should return an array that is not empty if there are websites added', done => {
			chai.request(app)
			.get('/websites/list')
			.set('Authorization', token)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.an('array').that.is.not.empty;
				done();
			})

		})
	})

	it('should return 401 if user is not authenticated', done => {
		
		chai.request(app)
		.get('/websites/list')
		.end((err, res) => {
			expect(res.status).to.equal(401);
			done();
		})
	})
});

describe('POST websites/add', () => {
	
	it('should create a website', done => {

		chai.request(app)
		.post('/websites/add')
		.set('Authorization', token)
		.send({
			name: 'Some site',
			url: 'www.site.com'
		})
		.end((err, res) => {
			expect(res.status).to.equal(200)
			done();
		})
	})

	it('should return 400 when data is null', done => {

		chai.request(app)
		.post('/websites/add')
		.set('Authorization', token)
		.send(null)
		.end((err, res) => {
			expect(res.status).to.equal(400)
			done();
		})
	})

	it('should return 400 when url is invalid', done => {

		chai.request(app)
		.post('/websites/add')
		.set('Authorization', token)
		.send({
			name: 'Invalid url',
			url: 'invalid'
		})
		.end((err, res) => {
			expect(res.status).to.equal(400)
			done();
		})
	})

	it('should return 400 if website is a duplicate', done => {

		chai.request(app)
		.post('/websites/add')
		.set('Authorization', token)
		.send({
			name: 'Some site',
			url: 'www.site.com'
		})
		.end((err, res) => {
			expect(res.status).to.equal(400)
			done();
		})
	})

	it('should not create a website if not authenticated', done => {

		chai.request(app)
		.post('/websites/add')
		.send({
			name: 'Some site',
			url: 'www.site2.com'
		})
		.end((err, res) => {
			expect(res.status).to.equal(401)
			done();
		})
	})

})

describe('Workers tests', () => {
	before(done => {
		let clock = sinon.useFakeTimers();

		statusJob.start();
		clock.tick(120000);
		statusJob.stop();
		clock.restore();

		done();
	})

	it('should show offline status', done => {

		models.Website.find({
			where: {
				url: 'www.test23251.com'
			}
		})
		.then(website => {
			expect(website.status).to.equal('offline');
			done();
		})
		.catch(err => done(err));
	})
});