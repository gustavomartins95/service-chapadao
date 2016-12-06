"use strict"

const servicesService = require('../service/servicesService.js');

var servicesConstroller = {
    cadastrar: function (dados, response) {
        servicesService.save(dados, function callback(id) {
            if (id) {
                response.redirect("/success");
            } else {
                response.redirect("/failed");
            }
        });
    },
    filtrar: function (nome, response) {
        servicesService.filter(nome, function callback(results) {
            if (results) {
                response.status(200).send(results);
            } else {
                response.sendStatus(404);
            }
        });
    },
    deletar: function (id, response) {
        servicesService.delete(id, function callback (id) {
            if(id) {
                response.redirect("/success");
            } else {
                response.redirect("/failed");
            }
        });
    }
};

module.exports = servicesConstroller;