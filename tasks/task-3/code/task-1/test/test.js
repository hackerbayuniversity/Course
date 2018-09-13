let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
let server = require('../index.js');

chai.use(chaiHttp);

// Description of a group of tests
describe('My tests', () => {
	// Description of an specific test
	describe('dumb test', () => {
		// The behaviour expected
		it('should return 4', done => {
			// what we are actually testing
			expect(2 + 2).to.equal(4);
			done();
		})
	})
	// test description
	describe('first test', () => {
		// expected behaviour
		it('should return { status: "success" }', done => {
			// connecting to the server
			chai.request(server)
			// method and route
			.get('/')
			// response from the server
			.end((err, res) => {
				// assertions
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal({ status: "success" })
				// done should be called to finish the test
				done();
			})
		})
	})

	describe('second test', () => {
		// expected behaviour
		it('should return { data: "Any String"}', done => {
			// connecting to the server
			chai.request(server)
			// method and route
			.post('/data')
			// our request body
			.send({ data: "Any String"})
			// response from the server
			.end((err, res) => {
				// assertions
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal({ data: "Any String"})
				// done should be called to finish the test
				done();
			})
		})
	})

	describe('third test', () => {
		// expected behaviour
		it('should return { data: "Any String"}', done => {
			// connecting to the server
			chai.request(server)
			// method and route
			.get('/data')
			// response from the server
			.end((err, res) => {
				// assertions
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal({ data: "Any String"})
				// done should be called to finish the test
				done();
			})
		})
	})
})