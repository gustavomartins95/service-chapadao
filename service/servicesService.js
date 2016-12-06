const connection = require('../api/conexao.js');

var servicesService = {
    save: function (dados, callback) {
        connection.query('INSERT INTO `service` SET ?', [dados], function (err, result) {
            if (err) throw err;

            callback(result.insertId);
        });
    }
}

module.exports = servicesService;