const express = require('express');
const routes = require("./routes/routes"); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

const app = express(); 

mongoose.Promise = global.Promise; 
if(!proces.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber'); 
}


app.use(bodyParser.json()); 

app.use((err, req, res, next) => {       //err will be populated if the previous middleware returned an error
        res.send({error: err.message}); 
});



routes(app); 


module.exports = app; 