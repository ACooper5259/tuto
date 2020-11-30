const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// log requests to the console:
app.use(logger('dev'));

// parsing incoming requests:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up one route for all requests
app.get ('*', (req, res) => res.status(200).send({message: "this is a tuto",}))

module.exports = app;