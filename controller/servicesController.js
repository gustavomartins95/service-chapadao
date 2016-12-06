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
    }
};

module.exports = servicesConstroller;