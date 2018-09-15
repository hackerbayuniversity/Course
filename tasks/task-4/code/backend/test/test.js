process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let server = require('../index.js');
let User = require('../models/User.js');

chai.use(chaiHttp);

describe('Tests for task 2', () => {

	before(done => {
		User.destroy({
			where: {},
            truncate: true
		})
		.then(() => {
			// After we empty our database we create one user for our login test
			User.create({
				email: 'test@email.com',
				password: '123456'
			})
			.then(() => done());
		});
	});

	describe('POST user/signup', () => {
		it('should sign a user', done => {

			chai.request(server)
			.post('/user/signup')
			.send({
				email: 'test@test.com',
				password: '123456'
			})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('session');
				done();
			})
		})
	})

	describe('POST user/login', () => {
		it('should login a user', done => {

			chai.request(server)
			.post('/user/login')
			.send({
				email: 'test@email.com',
				password: '123456'
			})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('session');
				done();
			})
		})
	})
})