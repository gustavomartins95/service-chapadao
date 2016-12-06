"use strict"

const servicesService = require('../service/servicesService.js');

var servicesConstroller = {
    cadastrar: function (dados, response) {
        servicesService.save(dados, function callback(id) {
            console.log({ id: id });
        });
    }
};

module.exports = servicesConstroller;