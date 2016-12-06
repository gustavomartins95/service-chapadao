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
    app.get("/consultar/:nome", function(request, response) {
        const nome = request.params.nome;
        servicesConstroller.filtrar(nome, response);
    });

    app.get("/success", function(request, response) {
        response.sendFile(path + "success.html");
    });

    app.get("/failed", function(request, response) {
        response.sendFile(path + "failed.html");
    });
};