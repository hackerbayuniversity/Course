# Task 11 Tutorial
*In this tutorial you will incorporate a SMS feature to your worker. Twilio will help up acomplish that.*

##### 1. Sign up for Twilio
* Go to [twilio.com](https://www.twilio.com) and sign up for a free account.
* If the service is available in your area, "buy" a number and verify your own number to receice the SMS.
* If the service is not available in your area "buy" an american number and download the `Textfree voice` app to get another american number to receive SMS in your phone.

*Since you are on your trial account you are not actually buying anything, so don't worry.*

##### 2. Add SMS feature to your worker
*Now that you are have a Twilio account and numbers, let's add the SMS functionality to your worker. It will send a notification if a website goes offline or online.*

* Install `twilio`, on the command line run.
    ```bash
    npm install twilio
    ```
* You will add the following code to your worker.
    ```javascript
    client.messages
        // Check if for test enviroment
        if(process.env.NODE_ENV !== 'test'){
            .create({
            // SMS body
            body: `${website.name} is offline`,
            // The number you bought
            from: process.env.PHONE_NUMBER,
            // Number where you will receive the SMS
            to: process.env.MY_NUMBER
            })
            .then(message => console.log(message.sid))
            .done();
        }
    ```
* Now add it inside `workers/uptime.js`.
    ```javascript
    // Other code
    // Find these variables in your Twilio console, remember to protect them
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
                            // After you succesfully update your website, send an SMS
                            client.messages
                              // Check if for test enviroment
                              if(process.env.NODE_ENV !== 'test'){
                                  .create({
                                // SMS body
                                 body: `${website.name} is offline`,
                                 // The number you bought
                                 from: process.env.PHONE_NUMBER,
                                 // Number where you will receive the SMS
                                 to: process.env.MY_NUMBER
                               })
                              .then(message => console.log(message.sid))
                              .done();
                              }
                              // If website is back online update status
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
                        .catch(err => console.log(err));
                        }
                    })
                })
            })
            .catch(err => console.log(err));
        }
        
        // Other code
    
    }
    ```

* The worker is only being called in the test file, let's initialize it but only if you are not running tests. Inside `index.js` add the following code.
    ```javascript
    // Other code
    // Require cron and the worker
    const cron = require('cron');
    const statusJob = require('./workers/uptime')(cron);
    
    // Other code
    
    // Check for test enviroment
    if(process.env.NODE_ENV !== 'test') {
        // Start worker
        statusJob.start();
        app.use(logger('tiny'));
    };
    
    // Other code
    ```
    
* Now time to see if this is actually working. On the command line run.
    ```bash
    npm start
    ```
* Depending on how many websites that are currently down or invalid in your database, you should see something like this.

![test-sms](test-sms.png)

* Check your phone too, you should be getting SMS.

*You might be receiving too many SMS, the way you testing for a website's availability is not best but it will do for now.*

##### 3. Wrapping up
*Good job, never thought sending SMS would be so simple. Take some time to really understand the code that you wrote and then move on to the next task.*