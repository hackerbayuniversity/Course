const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ status: 'success' });
});

// variable should be outside of the API's scope.
let data = null;
    
app.post('/data', (req, res) => {
    // We assign the body of the request to the data variable.
    data = req.body;
    // We send the data variable in the response.
    res.json(data);
});

app.get('/data', (req, res) => {
    //data comes from the variable we declared and mutared earlier
    res.json(data);
})

app.listen(3000, () => console.log('Listening on port 3000'));

module.exports = app;