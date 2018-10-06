const request = require('request');
const models = require('../models');

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
			  		.then(result => console.log('Status updated'))
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