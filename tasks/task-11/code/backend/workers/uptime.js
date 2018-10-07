const request = require('request');
const models = require('../models');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = function(cron){

	function changeStatus(){
		 models.Website.findAll({})
	 	.then(websites => {
	 		websites.map(website => {
	 			request(`http://${website.dataValues.url}`, function (error, response, body) {
			  	if((response && response.statusCode) !== 200 && website.dataValues.status === 'online') {
			  		models.Website.update(
			  			{status: 'offline'},
			  			{ where: { id: website.id }, returning: true})
			  		.then(result => {
			  			if(process.env.NODE_ENV !== 'test'){
			  				client.messages
						  .create({
						     body: `${website.name} is offline`,
						     from: process.env.PHONE_NUMBER,
						     to: process.env.MY_NUMBER
						   })
						  .then(message => console.log(message.sid))
						  .done();
			  			}
			  		})
			  		.catch(err => console.log(err));
			  		}
			  	if((response && response.statusCode) === 200 && website.dataValues.status === 'offline') {
			  		models.Website.update(
			  			{status: 'online'},
			  			{ where: { id: website.id }, returning: true})
			  		.then(result => {
			  			if(process.env.NODE_ENV !== 'test'){
			  				client.messages
						  .create({
						     body: `${website.name} is online`,
						     from: process.env.PHONE_NUMBER,
						     to: process.env.MY_NUMBER
						   })
						  .then(message => console.log(message.sid))
						  .done();
			  			}
			  		})
			  		.catch(err => console.log(err));
			  	}
			  	})
	 		})
	 	})
		.catch(err => console.log(err));
	}

	let statusJob = new cron.CronJob({
	    cronTime : '* * * * * *',
	    onTick : changeStatus,
	    start : false
  	});
 
  return statusJob;

}