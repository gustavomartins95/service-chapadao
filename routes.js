const path = __dirname + "/public/";

module.exports = function(app) {
    app.get("/", function(request, response) {
        response.sendFile(path + "index.html");
    });

    app.get("/adicionar", function(request, response) {
        response.sendFile(path + "adicionar.html");
    });
    app.post("/cadastrar", function (request, response) {
        console.log(request.body);
        response.send("Cadastrado.");
    });
    
    app.get("/consultar", function(request, response) {
        response.sendFile(path + "consultar.html");
    });
};