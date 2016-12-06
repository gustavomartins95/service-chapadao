"use strict"

var servicesConstroller = {
    cadastrar: function (dados, response) {
        console.log(dados);
        response.send("Cadastrado.");
    }
};

module.exports = servicesConstroller;