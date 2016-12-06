"use strict"

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser());

const port = 8080;
const hostname = "localhost";

app.listen(port, onStart());

app.use(express.static("public"));

app.get("/", function(request, response) {
    response.sendFile("index.html");
});

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`);
};