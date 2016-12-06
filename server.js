"use strict"

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser());
require('./routes.js')(app);

const port = 8080;
const hostname = "localhost";

app.listen(port, onStart());

app.use(express.static("public"));

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`);
};