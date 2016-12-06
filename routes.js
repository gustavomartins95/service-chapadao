const path = __dirname + "/public/";

const servicesConstroller = require('./controller/servicesController.js');

module.exports = function(app) {
    app.get("/", function(request, response) {
        response.sendFile(path + "index.html");
    });

    app.get("/adicionar", function(request, response) {
        response.sendFile(path + "adicionar.html");
    });
    app.post("/cadastrar", function (request, response) {
        servicesConstroller.cadastrar(request.body, response);
    });
    
    app.get("/consultar", function(request, response) {
        response.sendFile(path + "consultar.html");
    });
};